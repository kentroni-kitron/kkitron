import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'

import { DbService } from '@<%= npmScope %>/<%= projectLib %>/<%= dataAccessDbDirectory %>';

import { UsersService } from '<%= usersServiceDirectory %>';
import { <%= namePascal %>Service } from './<%= name %>.service';
import { <%= namePascal %>Resolver } from './<%= name %>.resolver';

@Module({
  imports: [
    JwtModule.register({ secret: <%= jwtSecret %> }),
  ],
  providers: [
    DbService,
    UsersService,
    <%= namePascal %>Resolver,
    <%= namePascal %>Service,
  ],
})
export class <%= namePascal %>Module {}
