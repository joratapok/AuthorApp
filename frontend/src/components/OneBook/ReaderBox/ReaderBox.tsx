import React, {useEffect, useState} from 'react'
import classes from './ReaderBox.module.css'
import {ChaptersType} from "../../../api/api"
import {Pagination} from "@material-ui/lab"
import {Box} from "@material-ui/core"

type BookDetailType = {
    bookId: number
    chapters: ChaptersType
    setOn: boolean
    getNewChapter: (event: object, numPage: number) => void
}

export const ReaderBox: React.FC<BookDetailType> = ({bookId, chapters, setOn, getNewChapter}) => {

    const [modal, setModal] = useState(false)

    useEffect(() => {
        setModal(setOn)
    }, [setOn])

    let modalClass = classes.modal + ' ' + ( modal ? classes.activeModal : '')
    let contentModalClass = classes.contentModal + ' ' + ( modal ? classes.activeContentModal : '')
    let contentWrapper = classes.contentWrapper + ' ' + ( modal ? classes.activeContentWrapper : '')

    return (
        <div>
            <div className={modalClass}>
            </div>

            <div className={contentWrapper}>
                <div className={contentModalClass}>
                    <Box display='flex' justifyContent='center' my={1}>
                        <Pagination count={chapters.count} color="primary" onChange={getNewChapter}/>
                    </Box>

                    some test text ----
                    {chapters.results[0].chapter}
                </div>
            </div>

        </div>

    )
}

export default ReaderBox;
