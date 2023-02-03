import { Module } from '@nestjs/common';

import { DbService } from '@<%= npmScope %>/<%= projectLib %>/<%= dataAccessDbDirectory %>';

import { <%= namePascal %>Service } from './<%= name %>.service';
import { <%= namePascal %>Resolver } from './<%= name %>.resolver';

@Module({
  providers: [<%= namePascal %>Resolver, <%= namePascal %>Service, DbService],
})
export class <%= namePascal %>Module {}
