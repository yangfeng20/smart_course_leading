function validateSaltedString(saltedString) {
    // 尝试找到一个匹配的随机数值，这里随机数值代表切片长度
    for (let randomNum = 6; randomNum <= 15; randomNum++) {
        if (randomNum > saltedString.length - 1) break; // 确保不会超出字符串长度

        // 获取切片和sum部分
        let slicedString = saltedString.substring(0, randomNum);
        let sumCharHex = saltedString.substring(randomNum, randomNum + 1); // 假设sum总是紧跟在切片后

        // 计算首字符的值
        let firstChar = slicedString.charAt(0);
        let firstCharValue = parseInt(firstChar, 16);

        // 有效性检查，确保转换是有效的
        if (isNaN(firstCharValue)) {
            console.error("Invalid character in input string.");
            return false;
        }

        // 计算sum值并转换为16进制，如果结果大于16，则取模16
        let sum = (firstCharValue + slicedString.length) % 16;
        let sumStr = sum.toString(16);

        // 比较计算的sum与字符串中的sum是否匹配
        if (sumStr === sumCharHex.toLowerCase()) {
            return true; // 成功验证
        }
    }

    // 如果所有尝试都失败了，则验证失败
    return false;
}

// 示例使用
let input = "b6a7b34389b"; // 假设这是加盐后的字符串，您需要替换成实际的加盐字符串
let isValid = validateSaltedString(input);
console.log("Is valid:", isValid);