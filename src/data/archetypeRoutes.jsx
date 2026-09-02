/* eslint-disable react/only-export-components */
import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { LIST_CONFIGS } from './lists'
import { FORM_CONFIGS } from './forms'
import { DETAIL_CONFIGS } from './details'
import { SETTINGS_CONFIGS } from './settings'

const ListPage = lazy(() => import('../Pages/Archetypes/ListPage'))
const FormPage = lazy(() => import('../Pages/Archetypes/FormPage'))
const DetailPage = lazy(() => import('../Pages/Archetypes/DetailPage'))
const SettingsPage = lazy(() => import('../Pages/Archetypes/SettingsPage'))

export const listRoutePaths = Object.keys(LIST_CONFIGS)
export const formRoutePaths = Object.keys(FORM_CONFIGS)
export const detailRoutePaths = Object.keys(DETAIL_CONFIGS)
export const settingsRoutePaths = Object.keys(SETTINGS_CONFIGS)

export const configuredRoutePaths = [
  ...listRoutePaths,
  ...formRoutePaths,
  ...detailRoutePaths,
  ...settingsRoutePaths,
]

export const archetypeRoutes = [
  ...listRoutePaths.map((p) => (
    <Route key={p} path={p} element={<ListPage config={LIST_CONFIGS[p]} />} />
  )),
  ...formRoutePaths.map((p) => (
    <Route key={p} path={p} element={<FormPage config={FORM_CONFIGS[p]} />} />
  )),
  ...detailRoutePaths.map((p) => (
    <Route key={p} path={p} element={<DetailPage config={DETAIL_CONFIGS[p]} />} />
  )),
  ...settingsRoutePaths.map((p) => (
    <Route key={p} path={p} element={<SettingsPage config={SETTINGS_CONFIGS[p]} />} />
  )),
]
