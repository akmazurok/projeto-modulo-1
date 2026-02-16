import { Pages } from "../constants/pages.enum";

export interface MenuItem {
    label: string;
    selected: boolean;
    page: Pages;
}