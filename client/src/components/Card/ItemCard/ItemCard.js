import './ItemCard.css';
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from "@mui/icons-material/Favorite";
import { WishItemsContext } from '../../../Context/WishItemsContext';

const ItemCard = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(props.item.isFavorite || false);
  const cartItemsContext = useContext(CartItemsContext);
  const wishItemsContext = useContext(WishItemsContext);

  const handleAddToWishList = () => {
    if (!isFavorite) {
      wishItemsContext.addItem(props.item);
      setIsFavorite(true);
    } else {
      wishItemsContext.removeItem(props.item);
      setIsFavorite(false);
    }
  };

  const handleAddToCart = () => {
    cartItemsContext.addItem(props.item, 1);
  };

  return (
    <div className="product__card__card">
      <div className="product__card">
        <div className="favorite-icon-container">
          <div
            className={`favorite-icon ${isFavorite ? "favorite-active" : ""}`}
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click navigation
              handleAddToWishList();
            }}
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </div>
        </div>
        <div
          className="product__image"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? (
            <img
              src={`https://shema-backend.vercel.app/public/${props.item.category}/${props.item.image[1].filename}`}
              alt="item"
              className="product__img"
            />
          ) : (
            <img
              src={`https://shema-backend.vercel.app/public/${props.item.category}/${props.item.image[0].filename}`}
              alt="item"
              className="product__img"
            />
          )}
        </div>
        <div className="product__card__detail">
          <div className="product__name">
            <Link to={`/item/${props.item.category}/${props.item._id}`}>
              {props.item.name}
            </Link>
          </div>
          <div className="product__description">
            <span>{props.item.description}</span>
          </div>
          <div className="product__price">
            <span>${props.item.price}</span>
          </div>
          <div className="add-to-cart-container">
            <button
              className="add-to-cart-button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click navigation
                handleAddToCart();
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
