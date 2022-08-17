import TwitterLogo from "@/public/twitter-logo.png";
import TwitterLogoLg from "@/public/twitter-logo-lg.png";

import { HomeIcon } from "@heroicons/react/solid";
import {
    HashtagIcon,
    BellIcon,
    InboxIcon,
    BookmarkIcon,
    ClipboardListIcon,
    UserIcon,
    DotsCircleHorizontalIcon,
} from "@heroicons/react/outline";

export const IMAGES = {
    TwitterLogo,
    TwitterLogoLg,
};

export const MENU_ITEMS = [
    { title: "Home", icon: HomeIcon, active: true, path: "/" },
    { title: "Explore", icon: HashtagIcon, active: false },
];

export const PRIVATE_MENU_ITEMS = [
    { title: "Notification", icon: BellIcon, active: false },
    { title: "Messages", icon: InboxIcon, active: false },
    { title: "Bookmarks", icon: BookmarkIcon, active: false },
    { title: "Lists", icon: ClipboardListIcon, active: false },
    { title: "Profile", icon: UserIcon, active: false },
    { title: "More", icon: DotsCircleHorizontalIcon, active: false },
];
