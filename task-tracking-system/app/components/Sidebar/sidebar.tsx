"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useGlobalState } from "@/app/context/globalProvider";
import menu from "@/app/utils/menu";
import { usePathname, useRouter } from "next/navigation";
import Button from "../Button/Button";
import { logout } from "@/app/utils/icons";

declare module "styled-components" {
  export interface DefaultTheme {
    sidebarWidth: string;
    colorbg: string;
    borderColor2: string;
    colorGrey3: string;
    colorGrey0: string;
    colorbg3: string;
    activeNavLinkHover: string;
    colorGreenDark: string;
    colorIcons: string;
    activeNavLink: string;
    colorIcons2: string;
  }
}

function Sidebar() {
  const { theme } = useGlobalState();

  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (link: string) => {
    router.push(link);
  };

  return (
    <SidebarStyled theme={theme}>
      <div className="profile">
        <div className="profile-overlay"></div>
        <div className="image">
          <Image
            width={70}
            height={70}
            src="/zoro.jpg"
            alt="Profile"
            loading="eager"
          />
        </div>

        <h1>
          <span>Zoro</span>
          <span> OP </span>
        </h1>
      </div>

      <ul className="nav-items">
        {menu.map((item) => {
          const link = item.link;
          return (
            <li
              className={`nav-item ${pathname === link ? "active" : ""}`}
              onClick={() => {
                handleClick(item.link);
              }}
              key={item.id}
            >
              {item.icon}
              <Link href={item.link}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
      <div className="sign-out relative">
        <Button
          name={"Sign Out"}
          type={"button"}
          padding={"0.4rem 0.8rem"}
          borderRed={"0.8rem"}
          fw={"500"}
          fs={"1rem"}
          icon={logout}
        />
      </div>
    </SidebarStyled>
  );
}

const SidebarStyled = styled.nav`
position: relative;
width: ${(props) => props.theme.sidebarWidth};
background-color: ${(props) => props.theme.colorbg};
border: 2px solid ${(props) => props.theme.borderColor2};
border-radius: 1rem;

display:  flex;
flex-direction: column;
justify-content: space-between;
color: ${(props) => props.theme.colorGrey3};

.profile {
  margin: 1rem;
  padding: 1rem 0.8rem;
  position: relative;
  border-radius: 1rem;
  cursor: pointer;

  font-weight: 500;
  color: ${(props) => props.theme.colorGrey0};

  display: flex;
  align-items: center;


.profile-overlay {
  position: absolute;
  inset: 0;
  backdrop-filter: blur(10px);
  background: ${(props) => props.theme.colorbg3};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  opacity: 0.2;
  z-index: 0;
  pointer-events: none;
}
.profile .image,

.profile h1 {
  position: relative;
  z-index: 1;
}

h1 {
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    margin-left: 0.8rem;
    line-height: 1.4rem;

}

.image {
 flex-shrink: 0;
 display: inline-block;
 overflow: hidden;
 transition: all 0.5s ease;
 border-radius: 100%;

}   
 img {
 border-radius: 100%;
 transition: all 0.5s ease;
 }

 > h1{
 margin-left: 0.8rem;
 font-size: clamp(1.2rem, 4vw, 1.4rem);
 line-height: 100%;
 }

 &:hover{
 .profile-overlay{
 opacity: 1;
    border: 2px solid ${(props) => props.theme.borderColor2};
 }

 img {
 transform: scale(1.1);
 }
 }
}

.nav-item {
    position: relative;
    padding: 0.8rem 1rem 0.9rem 2.1rem;
    margin: 0.3rem 0;

    display: grid;
    grid-template-columns: 40px 1fr;
    cursor: pointer;
    align-items: center;

    &::after {
        position: absolute;
        content: "";
        left: 0;
        top: 0;
        width: 0;
        height: 100%;
        background-color: ${(props) => props.theme.activeNavLinkHover};
        z-index: 1;
        transition: all 0.3s ease-in-out;

    }

    &::before{
        position: absolute;
        content: "";
        right: 0;
        top: 0;
        width: 0;
        height: 100%;
        background-color: ${(props) => props.theme.colorGreenDark};

        border-bottom-left-radius: 5px;
        border-top-left-radius: 5px;


    }

    a{
        font-weight: 500;
        transition: all 0.3s ease-in-out;
        z-index: 2;
        line-height: 0;
    } 
    i {
        display: flex;
        align-items: center;
        color: ${(props) => props.theme.colorIcons};
    }

    &:hover {
        &::after{
        width: 100%;
    }

    }

}

.active {
    background-color: ${(props) => props.theme.activeNavLink};

i,
a {
    color:  ${(props) => props.theme.colorIcons2};
}
}

.active::before {
    width: 0.3rem;

}

> button {
    margin: 1.5rem;
}
`;

export default Sidebar;
