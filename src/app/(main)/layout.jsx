import Footer from '@/components/shared/Footer';
import Navber from '@/components/shared/Navber';
import React from 'react';

const MainLayout = ({ children }) => {
      return (
            <div>
                  <Navber />

                  {children}
                  <Footer />
            </div>
      );
};

export default MainLayout;