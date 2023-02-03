import { Injectable } from '@nestjs/common';

import { DbService } from '@<%= npmScope %>/<%= project %>/<%= dataAccessDbDirectory %>';

import {
  <%= namePascalSingle %>,
  <%= namePascalSingle %>CreateInput,
  <%= namePascalSingle %>UpdateInput,
} from '@<%= npmScope %>/<%= project %>/<%= dbTypesDirectory %>';

@Injectable()
export class <%= namePascal %>Service {
  constructor(private readonly db: DbService) {}

  create(<%= nameCamelSingle %>CreateInput: <%= namePascalSingle %>CreateInput) {
    return this.db.<%= nameCamelSingle %>.create({ data: <%= nameCamelSingle %>CreateInput });
  }

  findAll() {
    return this.db.<%= nameCamelSingle %>.findMany({ where: {} });
  }

  findOne(id: <%= namePascalSingle %>['id']) {
    return this.db.<%= nameCamelSingle %>.findUnique({ where: { id } });
  }

  update(id: <%= namePascalSingle %>['id'], <%= nameCamelSingle %>UpdateInput: <%= namePascalSingle %>UpdateInput) {
    return this.db.<%= nameCamelSingle %>.update({ where: { id }, data: <%= nameCamelSingle %>UpdateInput });
  }

  remove(id: <%= namePascalSingle %>['id']) {
    return this.db.<%= nameCamelSingle %>.delete({ where: { id } });
  }
}
