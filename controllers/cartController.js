import { addProductToCart } from "../services/cartService";
import { catchError } from "../utils/catchAsyncError";

export const addProduct = catchError(async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;
  const product = await addProductToCart(userId , productId)

});
