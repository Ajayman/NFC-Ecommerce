import React from 'react';

const Footer = () => {
    return (
        < footer className="bg-muted/30 border-t border-border py-12" >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="font-bold text-primary mb-4">Nina Fashion Collection</h3>
                        <p className="text-sm text-muted-foreground">Premium fashion curated for you.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-primary mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a href="/shop" className="hover:text-primary transition-colors">
                                    All Products
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    Collections
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    Sale
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-primary mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a href="/contact" className="hover:text-primary transition-colors">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    Shipping
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    Returns
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-primary mb-4">Connect</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a href="https://www.facebook.com/ninafscollection/" className="hover:text-primary transition-colors">
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a href="https://www.tiktok.com/@ninafashioncollection" className="hover:text-primary transition-colors">
                                    Tiktok
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; 2026 Nina Fashion Collection. All rights reserved.</p>
                </div>
            </div>
        </footer >
    );
}

export default Footer;
