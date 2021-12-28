import React, { createContext, useReducer, useState, useEffect } from "react";

export const ItemContext = createContext(null);

const initialState = {
  hasLoaded: false,
  items: [],
  categoryItems: [],
  searchItems: [],
  cart: [],
};

const purchaseInitialState = {
  firstName: "",
  lastName: "",
  phoneNum: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
  province: "",
  creditCardNum: "",
  expiryM: "",
  expiryY: "",
  totalPrice: 0,
  cart:[]
}


function reducer(state, action) {
  switch (action.type) {
    case "receive-item-info-from-server": {
      return {
        ...state,
        hasLoaded: true,
        items: action.items,
      };
    }
    case "set-loading-state": {
      return {
        ...state,
        hasLoaded: action.hasLoaded,
      };
    }
    case "unset-loading-state": {
      return {
        ...state,
        hasLoaded: action.hasLoaded,
      };
    }

    case "update-shopping-cart": {
      return {
        ...state,
        cart: action.cart,
      };
    }

    case "clear-shopping-cart": {
      return {
        ...state,
        cart: [],
      };
    }

    case "receive-category-item-info-from-server": {
      return {
        ...state,
        categoryItems: action.categoryItems,
      };
    }

    case "receive-search-item-info-from-server": {
      return {
        ...state,
        searchItems: action.searchItems,
      };
    }

    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}

export const ItemProvider = ({ children }) => {
  const [paginationIndex, setPaginationIndex] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [purchaseInfo, setPurchaseInfo] = useState(purchaseInitialState);

  //the item fetch dispatch function set up for pagination. The existing array is duplicated with spread and the concatenated with the new incoming data.
  const receiveItemInfoFromServer = (data) => {
    dispatch({
      type: "receive-item-info-from-server",
      items: [...state.items].concat(data),
    });
  };

  const receiveCategoryItemInfoFromServer = (data) => {
    dispatch({
      type: "receive-category-item-info-from-server",
      categoryItems: [...state.categoryItems].concat(data),
    });
  };

  const receiveSearchItemInfoFromServer = (data) => {
    dispatch({
      type: "receive-search-item-info-from-server",
      searchItems: data,
    });
  };

  const clearPurchase = () => {
    window.localStorage.removeItem("cart");
    dispatch({
      type: "clear-shopping-cart",
      cart: [],
    });
  };

  const addPurchase = (data) => {
    let updateArray = [];

    if (state.cart.length === 0) {
      updateArray = [...state.cart].concat(data);
      window.localStorage.setItem("cart", JSON.stringify(updateArray));
    } else if (
      [...state.cart].filter((item) => item.product_id === data[0].product_id)
        .length === 0
    ) {
      updateArray = [...state.cart].concat(data);
      window.localStorage.setItem("cart", JSON.stringify(updateArray));
    } else {
      updateArray = [...state.cart].map((item) => {
        if (item.product_id === data[0].product_id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
      window.localStorage.setItem("cart", JSON.stringify(updateArray));
    }

    dispatch({
      type: "update-shopping-cart",
      cart: updateArray,
    });
  };

  const addQuantity = (data) => {
    let updateArray = [];

    updateArray = [...state.cart].map((item) => {
        if (item.product_id === data[0].product_id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
    });
    
    window.localStorage.setItem("cart", JSON.stringify(updateArray));

    dispatch({
      type: "update-shopping-cart",
      cart: updateArray,
    });
  };

  const lowerQuantity = (data) => {
    let updateArray = [];

    //eslint-disable-next-line
    updateArray = [...state.cart].map((item) => {
        if (item.product_id === data[0].product_id) {
          if (item.quantity !== 1) {
            return { ...item, quantity: item.quantity - 1 };  
          } else if (item.quantity === 1){ console.log ("0?")}
        } else {
          return item;
        }
      });

      window.localStorage.setItem("cart", JSON.stringify(updateArray));
    

    dispatch({
      type: "update-shopping-cart",
      cart: updateArray,
    });
  };

  const removePurchase = (data) => {
    let updateArray = [];
    
    if (state.cart.length === 1) {
      updateArray = [];
    } else {
    updateArray = [...state.cart].filter(item => item.product_id !== data[0].product_id )
    }  
    window.localStorage.setItem("cart", JSON.stringify(updateArray));
    
    dispatch({
      type: "update-shopping-cart",
      cart: updateArray,
    });
  };
    

  //Loading state will allow us to use a loading component during async operations in other components
  const setLoadingState = () => {
    dispatch({
      type: "set-loading-state",
      hasLoaded: false,
    });
  };

  //revert loading state to true when async operations are done
  const unsetLoadingState = () => {
    dispatch({
      type: "unset-loading-state",
      hasLoaded: true,
    });
  };

  //We load the items from DB using pagination
  useEffect(() => {
    const limit = 20;
    let skip = 20 * paginationIndex;
    const cartStorage = window.localStorage.getItem("cart");
    if (cartStorage) {
      addPurchase(JSON.parse(cartStorage));
    }

    setLoadingState();
    fetch(`/api/all-products?skip=${skip}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== 200) {
          console.log(data);
        } else {
          receiveItemInfoFromServer(data.data);
          unsetLoadingState();
        }
      });
  }, [paginationIndex]); // eslint-disable-line

  return (
    <ItemContext.Provider
      value={{
        state,
        receiveItemInfoFromServer,
        paginationIndex,
        setPaginationIndex,
        clearPurchase,
        addPurchase,
        removePurchase,
        setLoadingState,
        unsetLoadingState,
        receiveCategoryItemInfoFromServer,
        receiveSearchItemInfoFromServer,
        lowerQuantity,
        addQuantity,
        purchaseInfo, 
        setPurchaseInfo
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};
