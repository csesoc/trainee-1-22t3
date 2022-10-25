
import Title from './title'
<<<<<<< HEAD
=======
// import Search from './search'
import UploadCSV from './uploadCSV'
>>>>>>> 8cf0795100f6c59246c565d8eacdfe1f26011597

import 'antd/dist/antd.css';
import './header.css'

function Header() {
  	return (
		<div className='container'>
			<div className="header">
				<Title/>
<<<<<<< HEAD
=======
				<div className="header__space">
					<UploadCSV />
				</div>
>>>>>>> 8cf0795100f6c59246c565d8eacdfe1f26011597
			</div>
		</div>
  	)
}

export default Header