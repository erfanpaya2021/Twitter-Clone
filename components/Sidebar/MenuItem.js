const MenuItem = ({ Icon, title, active }) => {
    return (
        <li className="hover-effect w-full flex items-center justify-center xl:justify-start space-x-2 text-gray-700">
            <Icon className="w-8 h-8" />
            <span className={`hidden xl:inline ${active && "font-bold"}`}>{title}</span>
        </li>
    );
};

export default MenuItem;
