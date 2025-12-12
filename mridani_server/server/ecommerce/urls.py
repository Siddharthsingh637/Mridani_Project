from django.urls import path
from .views import *
from .views import GetProductsByCollection


urlpatterns = [
    # ✅ Product Routes
    path('getAllProducts/', GetAllData.as_view(), name='get_all_products'),
    path('getProductsByCategory/<str:category_name>/', GetProductsByCategory.as_view(),
         name='get_products_by_category'),
    path('products/<int:product_id>/', ProductDetailView.as_view(), name='product_detail'),

    # ✅ Auth Routes
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),

    # ✅ Orders
    path('orders/place/', PlaceOrderView.as_view(), name='place_order'),
    path('orders/my/', MyOrdersView.as_view(), name='my_orders'),
    
    # ✅ Wishlist Routes
    path('wishlist/', WishlistView.as_view(), name='wishlist'),  # GET & POST
    path('wishlist/<int:wishlist_id>/', WishlistDeleteView.as_view(), name='wishlist_delete'),

    # ✅ Cart Routes
    path('cart/', CartView.as_view(), name='cart'),
    path('cart/delete/<int:cart_id>/', CartDeleteView.as_view(), name='cart_delete'),
    path('cart/update/<int:cart_id>/', CartUpdateView.as_view(), name='cart_update'),
    path('me/', CurrentUserView),

# urls.py
    path('getProductsByCollection/<str:collection_name>/', GetProductsByCollectionName, name='get_products_by_collection_name'),


    # path('create-payment/', CreatePaymentView.as_view(), name='create_payment'),
    # path('payment/callback/', payment_callback, name='payment_callback'),

]
