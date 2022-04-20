export const emojis = [
    "🍇", "🍈", "🍉", "🍊", "🍋", "🍌", "🍍", "🥭", "🍎",
    "🍏", "🍐", "🍑", "🍒", "🍓", "🥝", "🍅", "🥥", "🥑",
    "🍆", "🥔", "🥕", "🌽", "🥒", "🥬", "🥦", "🧄", "🧅",
    "🍄", "🥜", "🌰", "🍞", "🥐", "🥖", "🥨", "🥯", "🥞",
    "🧇", "🧀", "🍖", "🍗", "🥩", "🥓", "🍔", "🍟", "🍕",
    "🌭", "🥪", "🌮", "🌯", "🥙", "🧆", "🥚", "🍳", "🥘",
    "🍲", "🥣", "🥗", "🍿", "🧈", "🧂", "🥫", "🍱", "🍘",
    "🍙", "🍚", "🍛", "🍜", "🍝", "🍠", "🍢", "🍣", "🍤",
    "🍥", "🥮", "🍡", "🥟", "🥠", "🥡", "🦪", "🍦", "🍧",
    "🍨", "🍩", "🍪", "🎂", "🍰", "🧁", "🥧", "🍫", "🍬",
    "🍭", "🍮", "🍯", "🍼", "🥛", "🍵", "🍷", "🍸", "🍹", "🍺",
    "🧃", "🧊"
]

export const unitMeasure = {
    liquid: ["tsp", "tbsp", "fl oz", "cup", "pt", "qt", "gal", "ml", "l"],
    food: ["lbs", "oz", "mg", "g", "kg", "count"]
}
export const tailwindColors = ["bg-slate-300", "bg-slate-500", "bg-slate-700", "bg-slate-900", "bg-gray-300", "bg-gray-500", "bg-gray-700", "bg-gray-900", "bg-zinc-300", "bg-zinc-500", "bg-zinc-700", "bg-zinc-900", "bg-neutral-300", "bg-neutral-500", "bg-neutral-700", "bg-neutral-900", "bg-stone-300", "bg-stone-500", "bg-stone-700", "bg-stone-900", "bg-red-300", "bg-red-500", "bg-red-700", "bg-red-900", "bg-orange-300", "bg-orange-500", "bg-orange-700", "bg-orange-900", "bg-amber-300", "bg-amber-500", "bg-amber-700", "bg-amber-900", "bg-yellow-300", "bg-yellow-500", "bg-yellow-700", "bg-yellow-900", "bg-lime-300", "bg-lime-500", "bg-lime-700", "bg-lime-900", "bg-green-300", "bg-green-500", "bg-green-700", "bg-green-900", "bg-emerald-300", "bg-emerald-500", "bg-emerald-700", "bg-emerald-900", "bg-teal-300", "bg-teal-500", "bg-teal-700", "bg-teal-900", "bg-cyan-300", "bg-cyan-500", "bg-cyan-700", "bg-cyan-900", "bg-sky-300", "bg-sky-500", "bg-sky-700", "bg-sky-900", "bg-blue-300", "bg-blue-500", "bg-blue-700", "bg-blue-900", "bg-indigo-300", "bg-indigo-500", "bg-indigo-700", "bg-indigo-900", "bg-violet-300", "bg-violet-500", "bg-violet-700", "bg-violet-900", "bg-purple-300", "bg-purple-500", "bg-purple-700", "bg-purple-900", "bg-fuchsia-300", "bg-fuchsia-500", "bg-fuchsia-700", "bg-fuchsia-900", "bg-pink-300", "bg-pink-500", "bg-pink-700", "bg-pink-900", "bg-rose-300", "bg-rose-500", "bg-rose-700", "bg-rose-900"]

// const tailwindColorsBase = ["slate", "gray", "zinc", "neutral", "stone", "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose"]
// const ex = []
// for (let i = 0; i < tailwindColorsBase.length; i++) {
//     let string1 = `bg-${tailwindColorsBase[i]}-300`
//     let string2 = `bg-${tailwindColorsBase[i]}-500`
//     let string3 = `bg-${tailwindColorsBase[i]}-700`
//     let string4 = `bg-${tailwindColorsBase[i]}-900`
//     ex.push(string1)
//     ex.push(string2)
//     ex.push(string3)
//     ex.push(string4)
// }

// console.log(JSON.stringify(ex))
// const str = `🍇 Grapes,🍈 Melon, 🍉 Watermelon,🍊 Tangerine,🍋 Lemon,🍌 Banana,🍍 Pineapple,🥭 Mango,🍎 Red Apple,🍏 Green Apple,🍐 Pear,🍑 Peach,🍒 Cherries,🍓 Strawberry,🫐 Blueberries,🥝 Kiwi Fruit,🍅 Tomato,🫒 Olive,🥥 Coconut,🥑 Avocado,🍆 Eggplant,🥔 Potato,🥕 Carrot,🌽 Ear of Corn,🌶️ Hot Pepper,🫑 Bell Pepper,🥒 Cucumber,🥬 Leafy Green,🥦 Broccoli,🧄 Garlic,🧅 Onion,🍄 Mushroom,🥜 Peanuts,🫘 Beans,🌰 Chestnut,🍞 Bread,🥐 Croissant,🥖 Baguette Bread,🫓 Flatbread,🥨 Pretzel,🥯 Bagel,🥞 Pancakes,🧇 Waffle,🧀 Cheese Wedge,🍖 Meat on Bone,🍗 Poultry Leg,🥩 Cut of Meat,🥓 Bacon,🍔 Hamburger,🍟 French Fries,🍕 Pizza,🌭 Hot Dog,🥪 Sandwich,🌮 Taco,🌯 Burrito,🫔 Tamale,🥙 Stuffed Flatbread,🧆 Falafel,🥚 Egg,🍳 Cooking,🥘 Shallow Pan of Food,🍲 Pot of Food,🫕 Fondue,🥣 Bowl with Spoon,🥗 Green Salad,🍿 Popcorn,🧈 Butter,🧂 Salt,🥫 Canned Food,🍱 Bento Box,🍘 Rice Cracker,🍙 Rice Ball,🍚 Cooked Rice,🍛 Curry Rice,🍜 Steaming Bowl,🍝 Spaghetti,🍠 Roasted Sweet Potato,🍢 Oden,🍣 Sushi,🍤 Fried Shrimp,🍥 Fish Cake with Swirl,🥮 Moon Cake,🍡 Dango,🥟 Dumpling,🥠 Fortune Cookie,🥡 Takeout Box,🦪 Oyster,🍦 Soft Ice Cream,🍧 Shaved Ice,🍨 Ice Cream,🍩 Doughnut,🍪 Cookie,🎂 Birthday Cake,🍰 Shortcake,🧁 Cupcake,🥧 Pie,🍫 Chocolate Bar,🍬 Candy,🍭 Lollipop,🍮 Custard,🍯 Honey Pot,🍼 Baby Bottle,🥛 Glass of Milk,☕ Hot Beverage,🫖 Teapot,🍵 Teacup Without Handle,🍶 Sake,🍾 Bottle with Popping Cork,🍷 Wine Glass,🍸 Cocktail Glass,🍹 Tropical Drink,🍺 Beer Mug,🥃 Tumbler Glass,🫗 Pouring Liquid,🥤 Cup with Straw,🧋 Bubble Tea,🧃 Beverage Box,🧉 Mate,🧊 Ice,🥢 Chopsticks,🍽️ Fork and Knife with Plate,🍴 Fork and Knife,🥄 Spoon,🫙 Jar`

// const dictionary = {}

// for (const emoji of str.split(',')) {
//     const symbol = emoji.substring(0, 3).trim(' ')
//     const text = emoji.substring(3).toLowerCase()
//     dictionary[text] = symbol
// }
// console.log(JSON.stringify(dictionary))
// console.log('DONE')

export const emojiDictionary = { "grapes": "🍇", "melon": "🍈", "watermelon": "🍉", "tangerine": "🍊", "lemon": "🍋", "banana": "🍌", "pineapple": "🍍", "mango": "🥭", "red apple": "🍎", "green apple": "🍏", "pear": "🍐", "peach": "🍑", "cherries": "🍒", "strawberry": "🍓", "blueberries": "🫐", "kiwi": "🥝", "tomato": "🍅", "olive": "🫒", "coconut": "🥥", "avocado": "🥑", "eggplant": "🍆", "potato": "🥔", "carrot": "🥕", "corn": "🌽", "chili pepper": "🌶️", "bell pepper": "🫑", "cucumber": "🥒", "vegetable": "🥬", "broccoli": "🥦", "garlic": "🧄", "onion": "🧅", "mushroom": "🍄", "peanuts": "🥜", "beans": "🫘", "chestnut": "🌰", "bread": "🍞", "croissant": "🥐", "baguette": "🥖", "flatbread": "🫓", "pretzel": "🥨", "bagel": "🥯", "pancakes": "🥞", "waffle": "🧇", "cheese wedge": "🧀", "meat on bone": "🍖", "poultry leg": "🍗", "cut of meat": "🥩", "bacon": "🥓", "hamburger": "🍔", "french fries": "🍟", "pizza": "🍕", "hot dog": "🌭", "sandwich": "🥪", "taco": "🌮", "burrito": "🌯", "tamale": "🫔", "stuffed flatbread": "🥙", "falafel": "🧆", "egg": "🥚", "cooking": "🍳", "shallow pan of food": "🥘", "pot of food": "🍲", "fondue": "🫕", "bowl with spoon": "🥣", "cereal": "🥣", "oatmeal": "🥣", "soup": "🥣", "salad": "🥗", "popcorn": "🍿", "butter": "🧈", "salt": "🧂", "canned food": "🥫", "bento box": "🍱", "rice cracker": "🍘", "rice ball": "🍙", "cooked rice": "🍚", "rice": "🍛", "ramen": "🍜", "udon": "🍜", "pho": "🍜", "noodles": "🍜", "spaghetti": "🍝", "sweet potato": "🍠", "oden": "🍢", "sushi": "🍣", "shrimp": "🍤", "fish cake": "🍥", "moon cake": "🥮", "dango": "🍡", "dumpling": "🥟", "fortune cookie": "🥠", "takeout": "🥡", "oyster": "🦪", "soft ice cream": "🍦", "shaved ice": "🍧", "ice cream": "🍨", "doughnut": "🍩", "cookie": "🍪", "birthday cake": "🎂", "shortcake": "🍰", "cupcake": "🧁", "pie": "🥧", "chocolate bar": "🍫", "candy": "🍬", "lollipop": "🍭", "custard": "🍮", "honey": "🍯", "baby bottle": "🍼", "glass of milk": "🥛", "hot beverage": "☕", "coffee": "☕", "teapot": "🫖", "tea": "🍵", "sake": "🍶", "bottle": "🍾", "wine glass": "🍷", "cocktail glass": "🍸", "tropical drink": "🍹", "beer mug": "🍺", "tumbler glass": "🥃", "pouring liquid": "🫗", "cup with straw": "🥤", "bubble tea": "🧋", "boba": "🧋", "beverage box": "🧃", "mate": "🧉", "ice": "🧊", "chopsticks": "🥢", "fork and knife with plate": "🍽️", "fork and knife": "🍴", "spoon": "🥄", "jar": "🫙", "food": "🍽️", "liquid": "☕" }


export const timeInMs = {
    hour: 3600000,
    day: 86400000,
    month: 2592000000,
    year: 31556952000
}

export const alphabet = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
]



// https://www.canstarblue.com.au/appliances/shelf-life-guide-foods-fridge/
export const shelfLife = {
    food: {
        "General Meat Products": {
            "Raw beef, lamb and steak": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 3,
                    "time": "day"
                },
                "freezer": {
                    "value": 6,
                    "time": "month"
                }
            },
            "Raw pork roast and lamb chops": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 3,
                    "time": "day"
                },
                "freezer": {
                    "value": 4,
                    "time": "month"
                }
            },
            "Pork sausages and raw pork": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 1,
                    "time": "day"
                },
                "freezer": {
                    "value": 1,
                    "time": "month"
                }
            },
            "Roast beef and roast lamb": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 2,
                    "time": "day"
                },
                "freezer": {
                    "value": 6,
                    "time": "month"
                }
            },
            "Cooked steak": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 2,
                    "time": "day"
                },
                "freezer": {
                    "value": 6,
                    "time": "month"
                }
            },
            "Stewed meat and casseroles": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 2,
                    "time": "day"
                },
                "freezer": {
                    "value": 2,
                    "time": "month"
                }
            },
            "Beef mince": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 2,
                    "time": "day"
                },
                "freezer": {
                    "value": 2,
                    "time": "month"
                }
            },
            "Pre-packaged ham slices": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 4,
                    "time": "day"
                },
                "freezer": {
                    "value": 1,
                    "time": "month"
                }
            },
            "Sausages and salami": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 4,
                    "time": "day"
                },
                "freezer": {
                    "value": 1,
                    "time": "month"
                }
            }
        },
        "Fish Products": {
            "Raw fish and prawns": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 1,
                    "time": "day"
                },
                "freezer": {
                    "value": 3,
                    "time": "month"
                }
            },
            "Cooked fish and prawns": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 3,
                    "time": "day"
                },
                "freezer": {
                    "value": 4,
                    "time": "month"
                }
            },
            "Cooked salmon": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 1,
                    "time": "week"
                },
                "freezer": {
                    "value": 2,
                    "time": "month"
                }
            },
            "Tinned tuna\t": {
                "pantry": {
                    "value": 12,
                    "time": "month"
                },
                "refrigerator": {
                    "value": 2,
                    "time": "day"
                },
                "freezer": {
                    "value": null
                }
            },
            "Crabs and oysters": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 2,
                    "time": "day"
                },
                "freezer": {
                    "value": 6,
                    "time": "month"
                }
            }
        },
        "Poultry and Other Products": {
            "Chicken mince and raw poultry": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 2,
                    "time": "day"
                },
                "freezer": {
                    "value": 3,
                    "time": "month"
                }
            },
            "Raw poultry": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 1,
                    "time": "day"
                },
                "freezer": {
                    "value": 3,
                    "time": "month"
                }
            },
            "Cooked poultry": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 3,
                    "time": "day"
                },
                "freezer": {
                    "value": 3,
                    "time": "month"
                }
            },
            "Cooked chicken nuggets": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 1,
                    "time": "day"
                },
                "freezer": {
                    "value": 1,
                    "time": "month"
                }
            },
            "Cooked poultry with stuffing": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 1,
                    "time": "day"
                },
                "freezer": {
                    "value": 1,
                    "time": "month"
                }
            },
            "Tofu and meat substitutes": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 4,
                    "time": "day"
                },
                "freezer": {
                    "value": 6,
                    "time": "week"
                }
            },
            "Frozen dinners": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": null
                },
                "freezer": {
                    "value": 3,
                    "time": "month"
                }
            }
        },
        "Dairy Products": {
            "Ice-cream": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": null
                },
                "freezer": {
                    "value": 1,
                    "time": "month"
                }
            },
            "Hard cheeses": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 1,
                    "time": "month"
                },
                "freezer": {
                    "value": null
                }
            },
            "Cottage and cream cheeses": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 1,
                    "time": "week"
                },
                "freezer": {
                    "value": null
                }
            },
            "Butter": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 2,
                    "time": "month"
                },
                "freezer": {
                    "value": null
                }
            },
            "Margarine": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 6,
                    "time": "month"
                },
                "freezer": {
                    "value": null
                }
            }
        },
        "Fat Products": {
            "Peanut butter": {
                "pantry": {
                    "value": 2,
                    "time": "month"
                },
                "refrigerator": {
                    "value": 6,
                    "time": "month"
                },
                "freezer": {
                    "value": null
                }
            },
            "Raw eggs": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 5,
                    "time": "week"
                },
                "freezer": {
                    "value": null
                }
            },
            "Hard-boiled eggs, cooked eggs": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 1,
                    "time": "week"
                },
                "freezer": {
                    "value": null
                }
            },
            "Milk chocolate": {
                "pantry": {
                    "value": 7,
                    "time": "month"
                },
                "refrigerator": {
                    "value": 7,
                    "time": "month"
                },
                "freezer": {
                    "value": null
                }
            },
            "Dark chocolate": {
                "pantry": {
                    "value": 1,
                    "time": "year"
                },
                "refrigerator": {
                    "value": 1,
                    "time": "year"
                },
                "freezer": {
                    "value": null
                }
            }
        },
        "Grain, Flour and Wheat Products": {
            "Cooked rice": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 5,
                    "time": "day"
                },
                "freezer": {
                    "value": null
                }
            },
            "Raw white rice": {
                "pantry": {
                    "value": 1,
                    "time": "year"
                },
                "refrigerator": {
                    "value": null
                },
                "freezer": {
                    "value": null
                }
            },
            "Raw brown rice": {
                "pantry": {
                    "value": 6,
                    "time": "month"
                },
                "refrigerator": {
                    "value": null
                },
                "freezer": {
                    "value": null
                }
            },
            "Pasta": {
                "pantry": {
                    "value": 2,
                    "time": "month"
                },
                "refrigerator": {
                    "value": null
                },
                "freezer": {
                    "value": null
                }
            },
            "Cereal": {
                "pantry": {
                    "value": 2,
                    "time": "month"
                },
                "refrigerator": {
                    "value": null
                },
                "freezer": {
                    "value": null
                }
            },
            "Bread": {
                "pantry": {
                    "value": 5,
                    "time": "day"
                },
                "refrigerator": {
                    "value": 1,
                    "time": "week"
                },
                "freezer": {
                    "value": 3,
                    "time": "month"
                }
            },
            "Cakes": {
                "pantry": {
                    "value": 1,
                    "time": "week"
                },
                "refrigerator": {
                    "value": 1,
                    "time": "week"
                },
                "freezer": {
                    "value": 3,
                    "time": "month"
                }
            }
        },
        "Canned and Bottled Goods": {
            "Dried fruits and gravy powder": {
                "pantry": {
                    "value": 6,
                    "time": "month"
                },
                "refrigerator": {
                    "value": null
                },
                "freezer": {
                    "value": null
                }
            },
            "Canned fruits and vegetables": {
                "pantry": {
                    "value": 12,
                    "time": "month"
                },
                "refrigerator": {
                    "value": null
                },
                "freezer": {
                    "value": null
                }
            },
            "Pate": {
                "pantry": {
                    "value": 5,
                    "time": "day"
                },
                "refrigerator": {
                    "value": null
                },
                "freezer": {
                    "value": null
                }
            },
            "Baby food": {
                "pantry": {
                    "value": 6,
                    "time": "month"
                },
                "refrigerator": {
                    "value": 1,
                    "time": "day"
                },
                "freezer": {
                    "value": null
                }
            }
        },
        "Fruits and Vegetables": {
            "Apples": {
                "pantry": {
                    "value": 4,
                    "time": "day"
                },
                "refrigerator": {
                    "value": 1,
                    "time": "month"
                },
                "freezer": {
                    "value": null
                }
            },
            "Avocadoes": {
                "pantry": {
                    "value": 3,
                    "time": "day"
                },
                "refrigerator": {
                    "value": 3,
                    "time": "day"
                },
                "freezer": {
                    "value": null
                }
            },
            "Bananas": {
                "pantry": {
                    "value": 2,
                    "time": "day"
                },
                "refrigerator": {
                    "value": null
                },
                "freezer": {
                    "value": null
                }
            },
            "Citrus": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 2,
                    "time": "day"
                },
                "freezer": {
                    "value": null
                }
            },
            "Grapes": {
                "pantry": {
                    "value": 1,
                    "time": "week"
                },
                "refrigerator": {
                    "value": 2,
                    "time": "week"
                },
                "freezer": {
                    "value": null
                }
            },
            "Kiwi fruit": {
                "pantry": {
                    "value": 3,
                    "time": "day"
                },
                "refrigerator": {
                    "value": null
                },
                "freezer": {
                    "value": null
                }
            },
            "Melons": {
                "pantry": {
                    "value": 2,
                    "time": "day"
                },
                "refrigerator": {
                    "value": 1,
                    "time": "week"
                },
                "freezer": {
                    "value": null
                }
            },
            "Peaches": {
                "pantry": {
                    "value": 2,
                    "time": "day"
                },
                "refrigerator": {
                    "value": 1,
                    "time": "week"
                },
                "freezer": {
                    "value": null
                }
            },
            "Pears": {
                "pantry": {
                    "value": 1,
                    "time": "day"
                },
                "refrigerator": {
                    "value": 3,
                    "time": "day"
                },
                "freezer": {
                    "value": null
                }
            },
            "Pineapple": {
                "pantry": {
                    "value": 2,
                    "time": "day"
                },
                "refrigerator": {
                    "value": 2,
                    "time": "week"
                },
                "freezer": {
                    "value": null
                }
            },
            "Strawberries": {
                "pantry": {
                    "value": 2,
                    "time": "day"
                },
                "refrigerator": {
                    "value": 1,
                    "time": "week"
                },
                "freezer": {
                    "value": null
                }
            },
            "Watermelon": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 3,
                    "time": "day"
                },
                "freezer": {
                    "value": null
                }
            },
            "Frozen vegetables": {
                "pantry": {
                    "value": 2,
                    "time": "day"
                },
                "refrigerator": {
                    "value": 6,
                    "time": "day"
                },
                "freezer": {
                    "value": null
                }
            },
            "Canned vegetables": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 1,
                    "time": "year"
                },
                "freezer": {
                    "value": null
                }
            },
            "Asparagus\t": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 3,
                    "time": "day"
                },
                "freezer": {
                    "value": null
                }
            },
            "Beans": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 3,
                    "time": "day"
                },
                "freezer": {
                    "value": null
                }
            },
            "Broccoli": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 3,
                    "time": "day"
                },
                "freezer": {
                    "value": null
                }
            },
            "Cabbage": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 5,
                    "time": "day"
                },
                "freezer": {
                    "value": null
                }
            },
            "Carrots": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 1,
                    "time": "month"
                },
                "freezer": {
                    "value": null
                }
            },
            "Capsicum": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 1,
                    "time": "month"
                },
                "freezer": {
                    "value": null
                }
            },
            "Cauliflower": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 1,
                    "time": "week"
                },
                "freezer": {
                    "value": null
                }
            },
            "Celery ": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 1,
                    "time": "week"
                },
                "freezer": {
                    "value": null
                }
            },
            "Corn": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 3,
                    "time": "week"
                },
                "freezer": {
                    "value": null
                }
            },
            "Cucumber": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 3,
                    "time": "day"
                },
                "freezer": {
                    "value": null
                }
            },
            "Eggplants": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 10,
                    "time": "day"
                },
                "freezer": {
                    "value": null
                }
            },
            "Lettuce and mushrooms": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 10,
                    "time": "day"
                },
                "freezer": {
                    "value": null
                }
            },
            "Onions": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 10,
                    "time": "day"
                },
                "freezer": {
                    "value": null
                }
            },
            "Peas ": {
                "pantry": {
                    "value": 1,
                    "time": "month"
                },
                "refrigerator": {
                    "value": 1,
                    "time": "month"
                },
                "freezer": {
                    "value": null
                }
            },
            "Sweet and white potatoes": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 5,
                    "time": "day"
                },
                "freezer": {
                    "value": null
                }
            },
            "Tomatoes": {
                "pantry": {
                    "value": 2,
                    "time": "month"
                },
                "refrigerator": {
                    "value": null
                },
                "freezer": {
                    "value": null
                }
            }
        },
    },
    liquid: {
        "Poultry and Other Products": {
            "Meat juice and gravy": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 1,
                    "time": "day"
                },
                "freezer": {
                    "value": 2,
                    "time": "month"
                }
            },
        },
        "Dairy Products": {
            "Milk": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 1,
                    "time": "week"
                },
                "freezer": {
                    "value": null
                }
            },
            "Cream": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 5,
                    "time": "day"
                },
                "freezer": {
                    "value": null
                }
            },
            "Yoghurt": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 1,
                    "time": "week"
                },
                "freezer": {
                    "value": null
                }
            },
            "Condensed milk": {
                "pantry": {
                    "value": 1,
                    "time": "year"
                },
                "refrigerator": {
                    "value": 4,
                    "time": "day"
                },
                "freezer": {
                    "value": null
                }
            }
        },
        "Fat Products": {
            "Vegetable oil": {
                "pantry": {
                    "value": 1,
                    "time": "month"
                },
                "refrigerator": {
                    "value": null
                },
                "freezer": {
                    "value": null
                }
            },
            "Salad oil": {
                "pantry": {
                    "value": 2,
                    "time": "month"
                },
                "refrigerator": {
                    "value": null
                },
                "freezer": {
                    "value": null
                }
            },
            "Olive oil": {
                "pantry": {
                    "value": 1,
                    "time": "week"
                },
                "refrigerator": {
                    "value": null
                },
                "freezer": {
                    "value": null
                }
            }
        },
        "Canned and Bottled Goods": {
            "Mayonnaise/salad dressing": {
                "pantry": {
                    "value": null
                },
                "refrigerator": {
                    "value": 2,
                    "time": "month"
                },
                "freezer": {
                    "value": null
                }
            },
            "Tomato/barbeque sauce": {
                "pantry": {
                    "value": 4,
                    "time": "month"
                },
                "refrigerator": {
                    "value": 4,
                    "time": "month"
                },
                "freezer": {
                    "value": null
                }
            },
            "Bottled fruit juice": {
                "pantry": {
                    "value": 1,
                    "time": "week"
                },
                "refrigerator": {
                    "value": 1,
                    "time": "week"
                },
                "freezer": {
                    "value": null
                }
            },
            "Canned fruit juice": {
                "pantry": {
                    "value": 6,
                    "time": "month"
                },
                "refrigerator": {
                    "value": null
                },
                "freezer": {
                    "value": null
                }
            },
            "Soft drink": {
                "pantry": {
                    "value": 6,
                    "time": "month"
                },
                "refrigerator": {
                    "value": 6,
                    "time": "month"
                },
                "freezer": {
                    "value": null
                }
            }
        },
    }
}



const items = `Mayonnaise/salad dressing
Tomato/barbeque sauce
Bottled fruit juice
Canned fruit juice
Soft drink`

const pantry = `null
4 month
1 week
6 month
6 month`

const fridge = `2 month
4 month
1 week
null
6 month`

const freezer = `null
null
null
null
null`

const itemsArray = ['Mayonnaise/salad dressing', 'Tomato/barbeque sauce', 'Bottled fruit juice', 'Canned fruit juice', 'Soft drink']
const pantryArray = ['null', '4 month', '1 week', '6 month', '6 month']
const fridgeArray = ['2 month', '4 month', '1 week', 'null', '6 month']
const freezerArray = ['null', 'null', 'null', 'null', 'null']

console.log(items.split('\n'))
console.log(pantry.split('\n'))
console.log(fridge.split('\n'))
console.log(freezer.split('\n'))

const finalObject = {}
for (const item of itemsArray) {
    const index = itemsArray.findIndex((element) => element === item)

    // Pantry Date: ['4', 'year']
    const pantryDate = pantryArray[index].split(' ')
    const pantryObject = {
        value: parseInt(pantryDate[0]),
        time: pantryDate[1]
    }

    // Fridge Date: ['5', 'day']
    const fridgeDate = fridgeArray[index].split(' ')
    const fridgeObject = {
        value: parseInt(fridgeDate[0]),
        time: fridgeDate[1]
    }

    // Freezer Date: ['2', 'year']
    const freezerDate = freezerArray[index].split(' ')
    const freezerObject = {
        value: parseInt(freezerDate[0]),
        time: freezerDate[1]
    }

    finalObject[item] = {
        pantry: {
            ...pantryObject
        },
        refrigerator: {
            ...fridgeObject
        },
        freezer: {
            ...freezerObject
        }

    }

}

console.log(JSON.stringify(finalObject))
