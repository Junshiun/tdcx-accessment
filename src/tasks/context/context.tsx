import { createContext, PropsWithChildren, useContext, useState } from "react";
import "./context.css"

// ### **Bonus Tasks (Optional but Recommended)**

// 1. **State Management**: Use **Redux** or **Context API** for managing a global state, e.g., a shopping cart where items can be added or removed globally across multiple components.

type TCart =  Map<string, number>

const CartContext = createContext<{
    cartStatus: TCart,
    addToCart: (item: string) => void;
    removeFromCart: (item: string) => void;
    decrementFromCart: (item: string) => void;
} | null>(null);

const CartProvider = (props: PropsWithChildren) => {

    const [cartStatus, setCartStatus] = useState<TCart>(new Map([]));

    const addToCart = (item: string) => {
        const copied = new Map(cartStatus);

        if (copied.has(item)) {
            copied.set(item, (copied.get(item) || 0) + 1)
        } else {
            copied.set(item, 1)
        }

        setCartStatus(copied)
    }

    const removeFromCart = (item: string) => {
        const copied = new Map(cartStatus);
        copied.delete(item);

        setCartStatus(copied);
    }

    const decrementFromCart = (item: string) => {
        const copied = new Map(cartStatus);

        if (copied.has(item)) {
            copied.set(item, (copied.get(item) || 0) - 1)
        }

        if ((copied.get(item) || 0) < 1) {
            copied.delete(item);
        }

        setCartStatus(copied)
    }

    return (
        <CartContext.Provider value={{cartStatus, addToCart, removeFromCart, decrementFromCart}}>
            {props.children}
        </CartContext.Provider>
    )
}

const useCartContext = () => useContext(CartContext)

export const Shopping = () => {

    return (
        <div className="shopping">
            <CartProvider>
                <Products />
                <Cart />
            </CartProvider>
        </div>
    )
}

const Products = () => {

    const cartContext = useCartContext();

    if (!cartContext) {
        return
    }

    const { addToCart } = cartContext;

    const list = [
        "Smartphone",
        "Laptop",
        "Wireless Earbuds",
        "Smartwatch",
        "Bluetooth Speaker",
        "Tablet",
        "Gaming Console",
        "Digital Camera",
        "Fitness Tracker",
        "Portable Charger"
    ]

    return (
        <ul className="products">
        {
            list.map(item => {
                return (
                    <li key={item} className="product">
                        <span>{item}</span>
                        <button onClick={() => addToCart(item)}>+</button>
                    </li>
                )
            })
        }
        </ul>
    )
}

const Cart = () => {

    const cartContext = useCartContext();

    if (!cartContext) {
        return
    }

    const { cartStatus, addToCart, removeFromCart, decrementFromCart } = cartContext;

    return (
        <>
            {
                cartStatus.size < 1? 
                    <h3>Cart is empty</h3>:
                    <>
                    <h3>Cart</h3>
                        <ul className="cart-list">
                            {
                                Array.from(cartStatus).map(([item, amount]) => {
                                    return (
                                        <li key={item} className="item">
                                            {
                                                item
                                            }
                                            <button onClick={() => addToCart(item)}>
                                                +
                                            </button>
                                            {
                                                amount
                                            }
                                            <button onClick={() => decrementFromCart(item)}>
                                                -
                                            </button>
                                            <button onClick={() => removeFromCart(item)}>
                                                remove
                                            </button>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </>
            } 
        </>
    )
}