import React from 'react'

// Redux
import { useSelector, useDispatch } from 'react-redux'

// Components
import Avatar from '../../components/pages/Account/Avatar'

function Account() {
    const { user, token } = useSelector(state => state.auth)
    const { avatar } = user
    console.log(user)
    return (
        <div>
            <Avatar
                emoji={avatar.emoji}
                bg={avatar.favoriteColor}
                ring={true}
                size='lg'
            />
        </div>
    )
}

export default Account