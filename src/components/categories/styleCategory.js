// styles/boxStyles.js
export const defaultStyles = {
    container: "container-default  mb-4 p-2 rounded-xl  bg-red-50 border-2 border-gray-100",
    title: "text-5xl font-extrabold mb-8 olive-title text-left text-orange-700",
    subtitle: "text-xl text-left text-gray-500 mb-2",
    grid: "grid md:grid-cols-2 gap-2",
    item: "rounded-xs shadow-xs flex justify-between border-b-1 border-gray-400 p-1",
    itemName: "text-xl font-semibold",
    itemDescription: "text-gray-800 mt-1",
    price: "text-l font-bold mt-8 text-orange-600",
    image: {
        container: "overflow-hidden rounded-lg container-img",
        img: "w-full object-cover",
        top: "mb-3 m-auto",
        bottom: "mt-6",
        "beside-title": "img-default",
    },
};

export const compactStyles = {
    container: "container-compact mb-10 text-left p-6 rounded-lg bg-gray-900 ",
    title: "text-5xl font-bold mb-8 text-left text-white",
    subtitle: "text-xl text-left text-white mb-2",
    grid: "grid md:grid-cols-3 gap-3",
    item: "p-3 rounded shadow-sm text-white border-b-2 border-gray-300 my-2",
    itemName: "text-l font-medium text-white",
    itemDescription: "font-medium mt-1",
    price: "text-base font-semibold mt-1 text-orange-700",
    image: {
        container: "overflow-hidden rounded-lg",
        img: "w-full h-40 object-cover",
        top: "mb-4",
        bottom: "mt-4",
        "beside-title": "w-12 h-12 rounded-full mr-3 object-cover",
    },
};

export const featuredStyles = {
    container: "container-featured mb-4 p-2 rounded-xl border-2 border-gray-300 overflow-hidden",
    title: "text-5xl font-extrabold text-left text-yellow-500",
    subtitle: "text-xl text-left text-gray-600",
    grid: "grid md:grid-cols-2 gap-2",
    item: "p-2 rounded-xl shadow-sm box-items my-4",
    itemName: "text-xl font-semibold",
    itemDescription: "text-gray-700 mt-2",
    price: "text-l font-bold mt-2 text-left text-yellow-500",
    image: {
        container: "rounded-xl",
        img: "w-full h-64 object-cover m-auto",
        top: "img-featured",
        bottom: "mt-8",
        "beside-title": "rounded-full object-cover img-featured-beside",
    },
};
