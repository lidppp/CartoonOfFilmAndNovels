const ErrImg1 = require("@/assets/img/imgErr/cszwfmtp.jpg")
const ErrImg2 = require("@/assets/img/imgErr/wyerr.png")
const ErrImg3 = require("@/assets/img/imgErr/xswfmtp.jpg")
const ErrImg4 = require("@/assets/img/imgErr/zwfmgqtp.jpg")
const ErrImg5 = require("@/assets/img/imgErr/zwfmt.jpg")
const ErrImg6 = require("@/assets/img/imgErr/zwfmtpdz.jpg")

const ErrImgArr = [ErrImg1,ErrImg2,ErrImg3,ErrImg4,ErrImg5,ErrImg6,]
export default function () {
    const random = Math.floor(Math.random() * ErrImgArr.length)
    return ErrImgArr[random]
}