import Title from "./title";

import "antd/dist/antd.css";
import "./header.css";

const Header = () => {
  return (
    <div className="container">
      <div className="header">
        <Title />
      </div>
    </div>
  );
};

export default Header;
