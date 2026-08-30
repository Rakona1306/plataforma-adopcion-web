"use client";

import LinkSocial, { LinkSocialProps } from "../../atoms/header/link-social";

export default function ListSocial({ linkSocials }: ListSocialProps) {
  return (
    <>
      {linkSocials.map((link, index) => (
        <LinkSocial key={index} {...link} />
      ))}
    </>
  );
}

interface ListSocialProps {
  linkSocials: LinkSocialProps[];
}
