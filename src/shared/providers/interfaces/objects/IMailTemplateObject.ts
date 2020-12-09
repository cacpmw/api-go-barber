/** Such an interface allows one to create
 * objects with as many properties as one
 * might need
 */
interface IVariables {
    [key: string]: string | number;
}
export default interface IMailTemplateObject {
    file: string;
    /** this may have any amount of properties
     * with any name
     */
    variables: IVariables;
}
