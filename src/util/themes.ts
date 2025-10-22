import { IceCream, Leaf, Lollipop, MoonStar, Sunrise, Sunset, Trees, Waves } from "lucide-react";

export const themes = [
    {
        name: "sunrise",
        displayName: "Sunrise",
        icon: Sunrise,
    }, {
        name: "dew",
        displayName: "Dew",
        icon: Waves,
    }, {
        name: "leaflight",
        displayName: "Leaflight",
        icon: Leaf,
    }, {
        name: "creamy",
        displayName: "Creamy",
        icon: IceCream,
    }, {
        name: "sunset",
        displayName: "Sunset",
        icon: Sunset,
    }, {
        name: "serene",
        displayName: "Serene",
        icon: MoonStar,
    }, {
        name: "forest",
        displayName: "Forest",
        icon: Trees,
    }, {
        name: "lollipop",
        displayName: "Lollipop",
        icon: Lollipop,
        // }, {
        //     name: "light",
        //     displayName: "Light",
        //     icon: MoonStar,
        // }, {
        //     name: "dark",
        //     displayName: "Dark",
        //     icon: MoonStar,
        // }, {
        //     name: "system",
        //     displayName: "System",
        //     icon: MoonStar,
    }
];

export const randomThemeName = () => {
    return themes[Math.floor(Math.random() * themes.length)].name;
}