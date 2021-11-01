export enum SignResultType {
    /**草稿 */
    draft = 0,
    /**同意 */
    agree = 1,
    /**駁回 */
    reject = 2,
    /**撤單 */
    cancel = 3,
    /**等待簽核 */
    sign_await = 4,
    /**未成立 */
    not_established = 5,
    /**作廢 */
    invalidate = 6,
    /**結案 */
    case_completed = 7,
}
