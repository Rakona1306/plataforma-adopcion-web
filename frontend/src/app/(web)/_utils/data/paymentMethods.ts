import { IconType } from "react-icons";
import { BsPaypal } from "react-icons/bs";

export const paymentMethods: PaymentMethod[] = [
  {
    name: "Paypal",
    href: "https://www.paypal.com/paypalme/julyavelino",
    icon: BsPaypal,
  },
  {
    name: "Yape o Plin July Avelino",
    account: "955288116",
    imageMehtod: "/home/methods/yape-y-plin.jpg"
  },
  {
    name: "BCP",
    account: "194 3819 3914 010",
    imageMehtod: "/home/methods/bcp.jpg"
  },
  {
    name: "Interbank",
    account: "898 3305540929",
    imageMehtod: "/home/methods/interbank.png"
  },
  {
    name: "BBVA",
    account: "0011 0048 0200 205504",
    imageMehtod: "/home/methods/bbva.jpg" 
  }
]

export interface PaymentMethod {
  name: string;
  href?: string;
  account?: string
  icon?: IconType;
  imageMehtod?: string
}