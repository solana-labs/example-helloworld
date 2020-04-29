#include "helloworld.c"
#include <criterion/criterion.h>

Test(hello, sanity) {
  uint8_t instruction_data[] = {};
  SolPubkey program_id = {.x = {
                              1,
                          }};
  SolPubkey key = {.x = {
                       2,
                   }};
  uint64_t lamports = 1;
  uint8_t data[] = {0, 0, 0, 0};
  SolAccountInfo accounts[] = {{
      &key,
      &lamports,
      sizeof(data),
      data,
      &program_id,
      0,
      true,
      true,
      false,
  }};
  SolParameters params = {accounts, sizeof(accounts), instruction_data,
                          sizeof(instruction_data), &program_id};

  cr_assert(0 == *(uint32_t *)data);
  cr_assert(SUCCESS == helloworld(&params));
  cr_assert(1 == *(uint32_t *)data);
  cr_assert(SUCCESS == helloworld(&params));
  cr_assert(2 == *(uint32_t *)data);
}
