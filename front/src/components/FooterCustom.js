import React from 'react'
import { Footer } from 'flowbite-react'

export default function FooterCustom() {
  return (
    <Footer container={true}>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">

          <Footer bgDark={true}>
            <div className="w-full">
              <div className="grid w-full grid-cols-2 gap-8 py-8 px-6 md:grid-cols-4">
                <div>
                  <Footer.Title title="About Axa" />
                  <Footer.LinkGroup col={true}>
                    <Footer.Link href="#">
                      Sitemap 
                    </Footer.Link>
                    <Footer.Link href="#">
                      Axa is recruiting
                    </Footer.Link>
                    <Footer.Link href="#">
                      Legal Notice 
                    </Footer.Link>
                    <Footer.Link href="#">
                      Personal data 
                    </Footer.Link>
                    <Footer.Link href="#">
                      Cookies policy
                    </Footer.Link>
                  </Footer.LinkGroup>
                </div>
                <div>
                  <Footer.Title title="our product" />
                  <Footer.LinkGroup col={true}>
                    <Footer.Link href="#">
                      Car insurance
                    </Footer.Link>
                    <Footer.Link href="#">
                      Home insurance
                    </Footer.Link>
                    <Footer.Link href="#">
                      Home loans
                    </Footer.Link>
                    <Footer.Link href="#">
                      All products
                    </Footer.Link>
                    <Footer.Link href="#">
                      Home insurance
                    </Footer.Link>
          
                    
                  </Footer.LinkGroup>
                </div>
                <div>
                  <Footer.Title title="legal" />
                  <Footer.LinkGroup col={true}>
                    <Footer.Link href="#">
                      Privacy Policy
                    </Footer.Link>
                    <Footer.Link href="#">
                      Licensing
                    </Footer.Link>
                    <Footer.Link href="#">
                      Terms & Conditions
                    </Footer.Link>
                  </Footer.LinkGroup>
                </div>
                <div>
                 
                </div>
              </div>
              <div className="w-full bg-gray-700 py-6 px-4 sm:flex sm:items-center sm:justify-between">
                <Footer.Copyright
                  href="#"
                  by=" Axa"
                  year={2022}
                />
               
              </div>
            </div>
          </Footer>
        </div>
        </div>
    </Footer>

  )
}
