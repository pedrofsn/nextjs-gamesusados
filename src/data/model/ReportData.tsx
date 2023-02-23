import { ItemType } from "./ItemType";

export class ReportData {
  constructor(
    readonly id: number,
    readonly type: ItemType
  ) { }
}
