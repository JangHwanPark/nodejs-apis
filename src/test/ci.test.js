import {log} from "~/utils/ci_test.js"

describe("CI Test", () => {
    it("Function Log Test", () => {
        // console.log 스파이 생성
        const consoleSpy = jest.spyOn(console, "log");

        // log 함수 호출
        log();

        // Hello World 호출 여부 확인
        expect(consoleSpy).toHaveBeenCalledWith("Hello World");

        // 스파이 정리
        consoleSpy.mockReset();
    })
})