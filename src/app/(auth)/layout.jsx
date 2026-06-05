import Navber from '@/components/shared/Navber';
import React from 'react';

const layout = ({ children }) => {
      return (
            <div>
                  <Navber />
                  {children}
            </div>
      );
};

export default layout;