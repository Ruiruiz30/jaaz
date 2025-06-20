/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as CanvasIdImport } from './routes/canvas.$id'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const CanvasIdRoute = CanvasIdImport.update({
  id: '/canvas/$id',
  path: '/canvas/$id',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/canvas/$id': {
      id: '/canvas/$id'
      path: '/canvas/$id'
      fullPath: '/canvas/$id'
      preLoaderRoute: typeof CanvasIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/canvas/$id': typeof CanvasIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/canvas/$id': typeof CanvasIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/canvas/$id': typeof CanvasIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/canvas/$id'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/canvas/$id'
  id: '__root__' | '/' | '/canvas/$id'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CanvasIdRoute: typeof CanvasIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CanvasIdRoute: CanvasIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/canvas/$id"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/canvas/$id": {
      "filePath": "canvas.$id.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
