import { getPageId, pageStringToNumbers } from '../../commons/page'
import type { LunaticState } from '../../type'

/**
 * Update the pager to enter a loop if the pager is on a loop
 */
export function autoExploreLoop(
  state: LunaticState,
  direction: 'forward' | 'backward' = 'forward',
): LunaticState {
  const newPager = {
    ...state.pager,
  }
  const pageId = getPageId(newPager)
  let page = state.pages[pageId]
  let hasExploredLoop = false
  const isForward = direction === 'forward'

  const goInsideSubpage = (subPages: string[], nbIteration: number) => {
    const maxSubPage = subPages.length
    const firstSubPage = pageStringToNumbers(
      subPages[isForward ? 0 : maxSubPage - 1],
    )
    newPager.page = firstSubPage[0].toString()
    newPager.subPage = firstSubPage[1] - 1 // Subpage starts at 0
    newPager.nbSubPages = maxSubPage
    newPager.nbIterations = nbIteration
    newPager.iteration = isForward ? 0 : newPager.nbIterations - 1
    hasExploredLoop = true
  }

  // The page is a loop
  if (page.isLoop && page.subPages && page.subPages.length > 0) {
    goInsideSubpage(
      page.subPages,
      state.executeExpression<number>(page.iterations),
    )
  }

  // No loop were explored, don't mutate the state
  if (!hasExploredLoop) {
    return state
  }

  return {
    ...state,
    isInLoop: newPager.nbIterations !== undefined,
    pager: newPager,
  }
}
