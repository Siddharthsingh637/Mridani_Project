from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework import generics, serializers, status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate
from .models import *
from .serializers import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Order, OrderItem  # adjust if needed
from django.views.decorators.csrf import csrf_exempt
from django.forms.models import model_to_dict
from django.http import JsonResponse
from .models import Product, Collection
from django.views.decorators.csrf import csrf_exempt

from django.core.serializers import serialize

from django.db.models import Q




# ✅ Get all products
class GetAllData(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        products = Product.objects.select_related('brand', 'category').all()
        product_list = []
        for product in products:
            product_list.append({
                "id": product.id,
                "product_title": product.product_title,
                "price": product.price,
                "product_description": product.product_description,
                "product_features": product.product_features,
                "shipping_information": product.shipping_information,
                "care_guide": product.care_guide,
                "image_field": product.image_field,
                "description_images": product.description_images,
                "brand": product.brand.name,
                "category": product.category.name,
                "collection": product.collection.name if product.collection else None,  # ✅ this line
                "trending": product.trending,
                "in_stock": product.in_stock,

            })
        return JsonResponse(product_list, safe=False)

# ✅ Get products by category
class GetProductsByCategory(APIView):
    permission_classes = [AllowAny]

    def get(self, request, category_name):
        try:
            category = Category.objects.get(name__iexact=category_name)
        except Category.DoesNotExist:
            return JsonResponse({"error": "Category not found."}, status=404)

        products = Product.objects.filter(category=category).select_related('brand', 'category')
        product_list = []
        for product in products:
            product_list.append({
                "id": product.id,
                "product_title": product.product_title,
                "price": product.price,
                "product_description": product.product_description,
                "product_features": product.product_features,
                "shipping_information": product.shipping_information,
                "care_guide": product.care_guide,
                "image_field": product.image_field,
                "description_images": product.description_images,
                "brand": product.brand.name,
                "category": product.category.name,
                "collection": product.collection.name,  # ✅ Ensures full name like "Rang Soot Sujni"
                "trending": product.trending,
                "in_stock": product.in_stock,

            })
        return JsonResponse(product_list, safe=False)

# ✅ Signup
class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            return JsonResponse({'message': 'User created successfully.', 'token': token.key}, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ✅ Login
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(username=serializer.validated_data['username'], password=serializer.validated_data['password'])
            if user:
                token, _ = Token.objects.get_or_create(user=user)
                return JsonResponse({'message': 'Login successful.', 'token': token.key})
            return JsonResponse({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def CurrentUserView(request):
    user = request.user
    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
    }, status=200)

# ✅ Place Order
class MyOrdersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user).order_by('-placed_at')
        data = []

        for order in orders:
            order_items = OrderItem.objects.filter(order=order)

            product_list = []
            for item in order_items:
                product = item.product
                product_list.append({
                    "id": product.id,
                    "title": product.product_title,
                    "price": product.price,
                    "quantity": item.quantity
                })

            data.append({
                "order_id": order.id,
                "total_amount": order.total_amount,
                "placed_at": order.placed_at,
                "products": product_list
            })

        return JsonResponse(data, status=status.HTTP_200_OK, safe=False)

# views.py
# PlaceOrderView (modified)
class PlaceOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Required inputs
        items = request.data.get('products')  # list of { product_id, quantity }
        name = request.data.get('name')
        address = request.data.get('address')
        city = request.data.get('city')
        state = request.data.get('state')
        pin_code = request.data.get('pin_code')
        phone_number = request.data.get('phone_number')

        # Optional inputs
        company = request.data.get('company', '')
        house = request.data.get('house', '')

        # Validate input
        if not items or not isinstance(items, list):
            return JsonResponse({'error': 'Invalid or missing product list.'}, status=400)

        if not all([name, address, city, state, pin_code, phone_number]):
            return JsonResponse({'error': 'Missing required address fields.'}, status=400)

        total_amount = 0
        order_items = []

        for item in items:
            product_id = item.get('product_id')
            quantity = item.get('quantity', 1)

            if not product_id:
                return JsonResponse({'error': 'Missing product_id in one item.'}, status=400)

            try:
                product = Product.objects.get(id=product_id)
            except Product.DoesNotExist:
                return JsonResponse({'error': f'Product with ID {product_id} not found.'}, status=404)

            subtotal = product.price * quantity
            total_amount += subtotal

            order_items.append({'product': product, 'quantity': quantity})

        # Save order
        order = Order.objects.create(
            user=request.user,
            total_amount=total_amount,
            name=name,
            company=company,
            address=address,
            house=house,
            city=city,
            state=state,
            pin_code=pin_code,
            phone_number=phone_number
        )

        # Save OrderItems
        for item in order_items:
            OrderItem.objects.create(order=order, product=item['product'], quantity=item['quantity'])

        return JsonResponse({'message': 'Order placed successfully.', 'order_id': order.id, 'total': total_amount}, status=201)

# ✅ My Orders
class MyOrdersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user).order_by('-placed_at')
        data = []

        for order in orders:
            order_items = order.items.select_related('product')  # `items` = related_name

            product_list = []
            for item in order_items:
                product = item.product
                product_list.append({
                    "id": product.id,
                    "title": product.product_title,
                    "price": product.price,
                    "quantity": item.quantity,
                    "subtotal": product.price * item.quantity
                })

            data.append({
                "order_id": order.id,
                "placed_at": order.placed_at,
                "total_amount": order.total_amount,
                "products": product_list,
                "shipping": {
                    "name": order.name,
                    "address": order.address,
                    "house": order.house,
                    "city": order.city,
                    "state": order.state,
                    "pin_code": order.pin_code,
                    "phone_number": order.phone_number
                }
            })

        return JsonResponse(data, safe=False, status=200)


# ✅ Product Details
class ProductDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, product_id):
        try:
            product = Product.objects.select_related('category', 'brand').get(id=product_id)
            product_data = {
                "id": product.id,
                "product_title": product.product_title,
                "price": product.price,
                "product_description": product.product_description,
                "product_features": product.product_features,
                "shipping_information": product.shipping_information,
                "care_guide": product.care_guide,
                "image_field": product.image_field,
                "description_images": product.description_images,
                "brand": product.brand.name,
                "category": product.category.name,
                "collection": product.collection.name,  # ✅ Ensures full name like "Rang Soot Sujni"
                "trending": product.trending,
                "in_stock": product.in_stock,

            }
            return JsonResponse(product_data, status=status.HTTP_200_OK, safe=False)
        except Product.DoesNotExist:
            return JsonResponse({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

# ✅ Wishlist APIs: Corrected version
# ✅ Wishlist APIView exactly as your previous version:

class WishlistView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        wishlist_items = Wishlist.objects.filter(user=request.user)
        serializer = WishlistSerializer(wishlist_items, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        serializer = WishlistSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return JsonResponse({'message': 'Item added to wishlist.'}, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class WishlistDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, wishlist_id):
        try:
            wishlist_item = Wishlist.objects.get(id=wishlist_id, user=request.user)
            wishlist_item.delete()
            return JsonResponse({'message': 'Item removed from wishlist.'})
        except Wishlist.DoesNotExist:
            return JsonResponse({'error': 'Item not found.'}, status=404)

# ✅ Cart APIs
class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart = Cart.objects.filter(user=request.user)
        serializer = CartSerializer(cart, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        serializer = CartSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'message': 'Product added to cart.'}, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CartDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, cart_id):
        try:
            cart_item = Cart.objects.get(id=cart_id, user=request.user)
            cart_item.delete()
            return JsonResponse({'message': 'Item removed from cart.'})
        except Cart.DoesNotExist:
            return JsonResponse({'error': 'Item not found.'}, status=404)

# ✅ Update quantity view
class CartUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, cart_id):
        try:
            cart_item = Cart.objects.get(id=cart_id, user=request.user)
        except Cart.DoesNotExist:
            return JsonResponse({'error': 'Cart item not found.'}, status=404)

        quantity = request.data.get("quantity")
        if quantity is None:
            return JsonResponse({'error': 'Quantity is required.'}, status=400)

        try:
            quantity = int(quantity)
            if quantity <= 0:
                return JsonResponse({'error': 'Quantity must be at least 1.'}, status=400)
        except ValueError:
            return JsonResponse({'error': 'Quantity must be an integer.'}, status=400)

        cart_item.quantity = quantity
        cart_item.save()
        return JsonResponse({'message': 'Quantity updated successfully.', 'quantity': cart_item.quantity})


# ✅ Get products by collection (top-level view)
class GetProductsByCollection(APIView):
    permission_classes = [AllowAny]

    def get(self, request, collection_id):
        try:
            collection = Collection.objects.get(name=collection_name)
        except Collection.DoesNotExist:
            return JsonResponse({"error": "Collection not found."}, status=404)

        products = Product.objects.filter(collection=collection).select_related('brand', 'category')
        product_list = []
        for product in products:
            product_list.append({
                "id": product.id,
                "product_title": product.product_title,
                "price": product.price,
                "product_description": product.product_description,
                "product_features": product.product_features,
                "shipping_information": product.shipping_information,
                "care_guide": product.care_guide,
                "image_field": product.image_field,
                "description_images": product.description_images,
                "brand": product.brand.name,
                "collection": product.collection.name if product.collection else None,  # ✅ this line
                "category": product.category.name,
                "trending": product.trending,
                "in_stock": product.in_stock,
            })
        return JsonResponse(product_list, safe=False)



@csrf_exempt
def GetProductsByCollectionName(request, collection_name):
    try:
        collection = Collection.objects.get(name__iexact=collection_name.replace("-", " "))
        products = Product.objects.filter(collection=collection)
        product_list = []

        for product in products:
            product_list.append({
                "id": product.id,
                "product_title": product.product_title,
                "price": product.price,
                "product_description": product.product_description,
                "product_features": product.product_features,
                "shipping_information": product.shipping_information,
                "care_guide": product.care_guide,
                "image_field": product.image_field,
                "description_images": product.description_images,
                "brand": product.brand.name,
                "collection": product.collection.name,  # ✅ Ensures full name like "Rang Soot Sujni"
                "category": product.category.name,
                "trending": product.trending,
                "in_stock": product.in_stock,
            })

        return JsonResponse(product_list, safe=False)

    except Collection.DoesNotExist:
        return JsonResponse({"error": "Collection not found"}, status=404)
