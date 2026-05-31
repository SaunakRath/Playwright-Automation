
import { Page } from '@playwright/test';

export async function selectDropdownValue(
  page: Page,
  dropdownId: string,
  value: string
) {

  // Dropdown button
  const dropdown = page.locator(
    `#div_${dropdownId} button`
  );

  // Click dropdown
  await dropdown.scrollIntoViewIfNeeded();

  await dropdown.click();

  // Wait for option visible
  const option = page.locator(
    '.ui-menu-item-wrapper'
  ).filter({
    hasText: new RegExp(`^${value}$`)
  }).first();

  await option.waitFor({
    state: 'visible'
  });

  // Click option
  await option.click();

}
