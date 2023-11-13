import React from "react";
import Link from "next/link";
//import Logo from "./Logo";
import { Button } from "@mui/material";

const Navbar = () => {
  return (
    <>
      <div class="w-full h-20 bg-emerald-800 sticky top-0">
        <div class="container mx-auto px-4 h-full">
          <div class="flex justify-between items-center h-full">
            
            <ul class="hidden md:flex gap-x-6 text-white">
              <li>
                <Link href="/find-users">
                  <p>Query Arkham</p>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <p>Debank</p>
                </Link>
              </li>
              <li>
                <Link href="/contacts">
                  <p>Contacts</p>
                </Link>
              </li>
            </ul>
            <Button />
          </div>
        </div>
      </div>
    </>
  );
};

export {Navbar};

//<Logo />