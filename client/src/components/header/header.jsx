
import Title from './title'
import SearchAddress from './searchAddress'
import UploadCSV from './uploadCSV'

import 'antd/dist/antd.css';
import './header.css'

function Header() {
  	return (
		<div className='container'>
			<div className="header">
				<Title/>
				<div className="header__space">
					<UploadCSV />
				</div>
			</div>
		</div>
  	)
}

export default Header