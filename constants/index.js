import TwitterLogo from "@/public/twitter-logo.png";
import ProfileIcon from "@/public/me.jpg";

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
    ProfileIcon,
};

export const MENU_ITEMS = [
    { title: "Home", icon: HomeIcon, active: true },
    { title: "Explore", icon: HashtagIcon, active: false },
    { title: "Notification", icon: BellIcon, active: false },
    { title: "Messages", icon: InboxIcon, active: false },
    { title: "Bookmarks", icon: BookmarkIcon, active: false },
    { title: "Lists", icon: ClipboardListIcon, active: false },
    { title: "Profile", icon: UserIcon, active: false },
    { title: "More", icon: DotsCircleHorizontalIcon, active: false },
];
