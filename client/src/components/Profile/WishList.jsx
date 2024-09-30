import { useSelector } from 'react-redux'
import { useGetWishListByIdQuery } from '../../redux/slices/wishlistApiSlice'
import Loader from '../Loader'
import WishItem from './subcomponenets/WishItem'

const WishList = () => {
    const { userInfo } = useSelector((state) => state.auth)

    const { data: wishList, isLoading,refetch } = useGetWishListByIdQuery(
        userInfo?.user?._id,
    )


    return isLoading ? (
        <Loader />
    ) : (
        <div className="p-8 shadow-sm shadow-primary-100">
            <h2 className="text-xl font-bold mb-4">WishList</h2>
            {wishList && wishList?.doc?.products && wishList?.doc?.products.length ? (
                <div className="flex flex-col gap-2">
                    {wishList?.doc?.products?.map((product) => (
                        <WishItem key={product._id} product={product} customer = {wishList.doc.customer._id} refetch={refetch} />
                    ))}
                </div>
            ) : (
                <p>No product added in wishlist.</p>
            )}
        </div>
    )
}

export default WishList
