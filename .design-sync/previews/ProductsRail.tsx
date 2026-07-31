// ProductsRail is the horizontally scrolling ecosystem rail on Home: scanner,
// printer, curing unit and resins, each as a tall product card.
//
// It is the one scoped component that takes a prop — an optional `children`
// slot rendered beside the rail. Two things this cell reproduces from
// HomeV2Page, because without them the rail collapses into a squashed strip:
//
//  · the `.hv2-prod` section wrapper, which sizes the panel;
//  · children wrapped in `.hv2-prod-intro` — the rail's grid places that
//    element as the copy column, so bare <p>/<h2> children land unpositioned.
//
// The copy is the Home screen's own.
import * as React from 'react';
import { ProductsRail } from 'web';
import { HomeStage } from './_stage';

export function EcosystemRail() {
  return (
    <HomeStage>
      <section className="hv2-prod" id="products">
        <ProductsRail>
          <div className="hv2-prod-intro">
            <p className="hv2-eyebrow">Products</p>
            <h2 className="hv2-h2">
              Built for precision.
              <br />
              Designed for <span className="hv2-blue">you.</span>
            </h2>
            <p className="hv2-body">
              Explore our complete range of digital dentistry solutions.
            </p>
            <a className="hv2-btn hv2-btn-ghost hv2-prod-cta" href="/products">
              <span>Explore All Products</span>
            </a>
          </div>
        </ProductsRail>
      </section>
    </HomeStage>
  );
}
