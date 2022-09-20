export interface MenuItem {
  availableStatus: "available"|"unavailable",
  barcode?: string,
  brandcode?: string,
  cid?: string,
  created?: Date,
  deleted?: string,
  description?: string,
  id?: string,
  itemcode?: string,
  modified?: Date,
  name?: string,
  photos?: string,
  price?: string,
  sequence?: string,
  specialType?: string,
  srp?: string
}