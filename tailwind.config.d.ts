declare const _default: {
    darkMode: ["class"];
    content: string[];
    theme: {
        extend: {
            fontFamily: {
                heading: [string, string];
                body: [string, string];
            };
            colors: {
                background: string;
                foreground: string;
                primary: string;
                "primary-foreground": string;
                border: string;
            };
            borderRadius: {
                full: string;
                xl: string;
                "2xl": string;
                "3xl": string;
            };
        };
    };
    plugins: {
        handler: () => void;
    }[];
};
export default _default;
