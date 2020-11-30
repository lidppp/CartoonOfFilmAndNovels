const ErrImg1 = require("@/static/imgErr/cszwfmtp.jpg")
const ErrImg2 = require("@/static/imgErr/wyerr.png")
const ErrImg3 = require("@/static/imgErr/xswfmtp.jpg")
const ErrImg4 = require("@/static/imgErr/zwfmgqtp.jpg")
const ErrImg5 = require("@/static/imgErr/zwfmt.jpg")
const ErrImg6 = require("@/static/imgErr/zwfmtpdz.jpg")

const ErrImgArr = [ErrImg1,ErrImg2,ErrImg3,ErrImg4,ErrImg5,ErrImg6,]
export default function () {
    const random = Math.floor(Math.random() * ErrImgArr.length)
    return ErrImgArr[random]
}