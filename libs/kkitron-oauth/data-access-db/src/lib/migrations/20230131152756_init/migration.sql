-- CreateEnum
CREATE TYPE "code_challenge_method" AS ENUM ('S256', 'plain');

-- CreateTable
CREATE TABLE "oauth_clients" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "secret" VARCHAR(256),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "oauth_clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oauth_redirect_uris" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "uri" VARCHAR(256) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "oauth_redirect_uris_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oauth_scopes" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "oauth_scopes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oauth_codes" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "user_id" VARCHAR(256),
    "code" VARCHAR(512) NOT NULL,
    "redirect_uri" VARCHAR(256),
    "code_challenge" VARCHAR(512),
    "code_challenge_method" "code_challenge_method",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "oauth_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oauth_tokens" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "user_id" TEXT,
    "access_token" VARCHAR(512) NOT NULL,
    "access_token_expires_at" TIMESTAMP(3) NOT NULL,
    "refresh_token" VARCHAR(512) NOT NULL,
    "refresh_token_expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "oauth_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_oauth_tokens_to_scopes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_oauth_codes_to_scopes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "oauth_clients_name_key" ON "oauth_clients"("name");

-- CreateIndex
CREATE UNIQUE INDEX "oauth_redirect_uris_uri_key" ON "oauth_redirect_uris"("uri");

-- CreateIndex
CREATE UNIQUE INDEX "oauth_codes_code_key" ON "oauth_codes"("code");

-- CreateIndex
CREATE UNIQUE INDEX "oauth_tokens_access_token_key" ON "oauth_tokens"("access_token");

-- CreateIndex
CREATE UNIQUE INDEX "oauth_tokens_refresh_token_key" ON "oauth_tokens"("refresh_token");

-- CreateIndex
CREATE UNIQUE INDEX "_oauth_tokens_to_scopes_AB_unique" ON "_oauth_tokens_to_scopes"("A", "B");

-- CreateIndex
CREATE INDEX "_oauth_tokens_to_scopes_B_index" ON "_oauth_tokens_to_scopes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_oauth_codes_to_scopes_AB_unique" ON "_oauth_codes_to_scopes"("A", "B");

-- CreateIndex
CREATE INDEX "_oauth_codes_to_scopes_B_index" ON "_oauth_codes_to_scopes"("B");

-- AddForeignKey
ALTER TABLE "oauth_redirect_uris" ADD CONSTRAINT "oauth_redirect_uris_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "oauth_clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oauth_scopes" ADD CONSTRAINT "oauth_scopes_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "oauth_clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oauth_codes" ADD CONSTRAINT "oauth_codes_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "oauth_clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oauth_tokens" ADD CONSTRAINT "oauth_tokens_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "oauth_clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_oauth_tokens_to_scopes" ADD CONSTRAINT "_oauth_tokens_to_scopes_A_fkey" FOREIGN KEY ("A") REFERENCES "oauth_scopes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_oauth_tokens_to_scopes" ADD CONSTRAINT "_oauth_tokens_to_scopes_B_fkey" FOREIGN KEY ("B") REFERENCES "oauth_tokens"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_oauth_codes_to_scopes" ADD CONSTRAINT "_oauth_codes_to_scopes_A_fkey" FOREIGN KEY ("A") REFERENCES "oauth_codes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_oauth_codes_to_scopes" ADD CONSTRAINT "_oauth_codes_to_scopes_B_fkey" FOREIGN KEY ("B") REFERENCES "oauth_scopes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
