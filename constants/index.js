import TwitterLogo from "@/public/twitter-logo.png";
import TwitterLogoLg from "@/public/twitter-logo-lg.png";
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
    TwitterLogoLg,
    ProfileIcon,
};

export const MENU_ITEMS = [
    { title: "Home", icon: HomeIcon, active: true },
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

export const DUMMY_POSTS = [
    {
        id: 1,
        name: "Erfan Paya",
        username: "erfanpaya",
        userImage: ProfileIcon,
        postImage:
            "https://images.unsplash.com/photo-1660213372424-deecb106a28e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=912&q=80",
        text: "Beatiful flowers",
        timestamp: "2 hours ago",
    },
    {
        id: 2,
        name: "Erfan Paya",
        username: "erfanpaya",
        userImage: ProfileIcon,
        postImage:
            "https://images.unsplash.com/photo-1657299156185-6f5de6da0996?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        text: "Nice lunch",
        timestamp: "4 hours ago",
    },
    {
        id: 3,
        name: "Erfan Paya",
        username: "erfanpaya",
        userImage: ProfileIcon,
        postImage:
            "https://images.unsplash.com/photo-1657299156185-6f5de6da0996?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        text: "Nice lunch",
        timestamp: "4 hours ago",
    },
    {
        id: 4,
        name: "Erfan Paya",
        username: "erfanpaya",
        userImage: ProfileIcon,
        postImage:
            "https://images.unsplash.com/photo-1657299156185-6f5de6da0996?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        text: "Nice lunch",
        timestamp: "4 hours ago",
    },
];
