import React from 'react';

import { Navbar} from 'flowbite-react'
export default function Header() {
    return (
        <>
            <Navbar  data-testid="header" className="fixed top-0 w-full" fluid={true} rounded={true}>
                <Navbar.Brand >
                    <img
                        src="axa-logo.png"
                        width="60px"
                        height="60px"
                        alt=""
                        href="https://www.axa.fr/"
                    />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                        <b>Chart APP</b>
                    </span>
                </Navbar.Brand>
                <Navbar.Collapse>
                    <div className="flex">
                        <Navbar.Link href="/dashboard">Dashboard</Navbar.Link>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}