import React, { useEffect } from 'react'

function NavBar() {
  const [scrollYPosition, setScrollYPosition] = React.useState(0);
  const handleScroll = () => {
    const newScrollYPosition = window.pageYOffset;
    setScrollYPosition(newScrollYPosition);
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Now the vertical position is available with `scrollYPosition`
  console.log(scrollYPosition)
  return (
    <div className='navbar' style={{backgroundColor : scrollYPosition !== 0 ? null :  '#111'}}>
      <img className='logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png' alt='NavBar' />
      <div className='right-icons'>
        <label className='KIDS' style={{color:'white', fontSize:14}}>KIDS</label>
        <label className='DVD' style={{color:'white', fontSize:14}}>DVD</label>
        <span class="material-symbols-outlined notifications" style={{color:'white', marginLeft:20}}>notifications</span>
        <img className='avatar' src='https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png' alt='avatar' />
      </div>
    </div>
  )
}

export default NavBar
