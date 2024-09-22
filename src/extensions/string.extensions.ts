export {};
declare global {
  interface String {
    isNullOrEmpty(): boolean;
    isNotNullOrEmpty(): boolean;
    camelCaseToSentenceCase(): string;
    equalsIgnoreCase(val: string): boolean;
  }
}

String.prototype.isNullOrEmpty = function (this: string): boolean {
  if (this == undefined || this == null) return true;
  return this.length == 0;
};

String.prototype.isNotNullOrEmpty = function (
  this: string | undefined,
): boolean {
  if (this == undefined || this == null) return false;
  return this.length > 0;
};

String.prototype.camelCaseToSentenceCase = function (this: string): string {
  let data = this.split(/(?=(?!^)[A-Z])/)
    .join(' ')
    .toLowerCase();
  return `${data.charAt(0).toUpperCase()}${data.slice(1)}`;
};

String.prototype.equalsIgnoreCase = function (
  this: string,
  val: string,
): boolean {
  return this.toLowerCase() == val.toLowerCase();
};
