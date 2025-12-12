from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, Order, Product, Wishlist, Cart
from .models import Product

# ✅ Signup Serializer
class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])  # hash the password
        user.save()

        # ✅ Automatically create associated UserProfile
        UserProfile.objects.create(user=user)

        return user


# ✅ Login Serializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


# ✅ Order Serializer
class OrderProductInputSerializer(serializers.Serializer):
    product = serializers.IntegerField()
    quantity = serializers.IntegerField()

    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError("Quantity must be greater than 0.")
        return value

class OrderSerializer(serializers.Serializer):
    products = OrderProductInputSerializer(many=True)

    def validate_products(self, value):
        if not value:
            raise serializers.ValidationError("At least one product is required.")
        return value

    def create(self, validated_data):
        user = self.context['request'].user
        product_list = validated_data['products']

        total_amount = 0
        order_items = []

        for item in product_list:
            try:
                product = Product.objects.get(id=item['product'])
            except Product.DoesNotExist:
                raise serializers.ValidationError(f"Product with ID {item['product']} does not exist.")

            quantity = item['quantity']
            total_amount += product.price * quantity
            order_items.append((product, quantity))

        # Create order
        order = Order.objects.create(user=user, total_amount=total_amount)

        # Create order items
        for product, quantity in order_items:
            OrderItem.objects.create(order=order, product=product, quantity=quantity)

        return order

# ✅ Wishlist Serializer
class WishlistSerializer(serializers.ModelSerializer):
    product_detail = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Wishlist
        fields = ['id', 'product', 'product_detail']

    def get_product_detail(self, obj):
        return {
            'id': obj.product.id,
            'product_title': obj.product.product_title,
            'price': obj.product.price,
            'image_field': obj.product.image_field,
            'trending': obj.product.trending,  # ✅ ADD THIS
            'in_stock': obj.product.in_stock,  # ✅ ADD THIS
        }

    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user
        product = validated_data.get('product')

        if Wishlist.objects.filter(user=user, product=product).exists():
            raise serializers.ValidationError("Already in wishlist.")

        return Wishlist.objects.create(user=user, product=product)

# ✅ Cart Serializer
class CartSerializer(serializers.ModelSerializer):
    product_detail = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'product', 'product_detail', 'quantity', 'added_at']

    def get_product_detail(self, obj):
        return {
            "id": obj.product.id,
            "product_title": obj.product.product_title,
            "price": obj.product.price,
            "image_field": obj.product.image_field,
            'trending': obj.product.trending,  # ✅ ADD THIS
            'in_stock': obj.product.in_stock,  # ✅ ADD THIS
        }

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return super().create(validated_data)
