import React, { useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { AppStateType } from '../../../../redux/store'
import { AuthinitialType, changeAvatarThunk } from '../../../../redux/authReducer'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { Backdrop, Modal } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import ImageUploader from 'react-images-upload'

export type MapStatePropsType = {
    auth: AuthinitialType
}
export type MapDispatchPropsType = {
    changeAvatarThunk: (JWTToken: string, userId: number, photo: any) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '98%',
            maxWidth: '600px',
            margin: 'auto'
        }
    })
)

const ChangeUser: React.FC<MapStatePropsType & MapDispatchPropsType> = ({ auth, changeAvatarThunk }) => {
    const cl = useStyles()
    const [modal, setModal] = useState(false)

    const modalOn = () => {
        setModal(true)
    }
    const modalOff = () => {
        setModal(false)
    }

    const onDrop = (picture: any) => {
        if (picture.length > 0) {
            changeAvatarThunk(auth.accessToken, auth.id, picture[0])
            setModal(false)
        }
    }

    return <>

        <AccountCircleIcon onClick={modalOn}/>

        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={cl.modal}
            open={modal}
            onClose={modalOff}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500
            }}
        >
            <ImageUploader
                withIcon={true}
                label='Максимальный размер - 3мб, доступные форматы - jpg, gif, png'
                buttonText='Выбрать новый аватар'
                onChange={onDrop}
                imgExtension={['.jpg', '.gif', '.png']}
                maxFileSize={3242880}
            />

        </Modal>

    </>
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    auth: state.auth
})

export default compose<React.ComponentType>(connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>(mapStateToProps,
    { changeAvatarThunk }))(ChangeUser)
