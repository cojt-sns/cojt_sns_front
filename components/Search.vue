<template>
  <div class="column is-fullheight">
    <MainHeader v-if="$device.isMobile" title="Search" :groups="groups" />
    <div class="top">
      <div class="level search-type is-mobile">
        <div class="level-item">
          <h1
            v-if="$route.query.type != 'graph'"
            class="title is-5 has-text-primary"
          >
            List
          </h1>
          <a v-else class="title is-5 has-text-grey" @click="moveToList()">
            List
          </a>
        </div>
        <div class="level-item">
          <h1
            v-if="$route.query.type == 'graph'"
            class="title is-5 has-text-primary"
          >
            Graph
          </h1>
          <nuxt-link
            v-else
            to="/search?type=graph"
            class="title is-5 has-text-grey"
          >
            Graph
          </nuxt-link>
        </div>
      </div>
      <div v-if="$route.query.type != 'graph'" class="field has-addons">
        <div class="control is-expanded">
          <input
            v-model="keyword"
            type="text"
            class="input"
            @keydown.enter="searchGroups()"
          />
        </div>
        <div class="control">
          <!-- eslint-disable no-irregular-whitespace -->
          <nuxt-link
            class="button"
            :to="
              `/search?type=list&keywords=${keyword.split(/[ 　]/).join(' ')}`
            "
          >
            Search
          </nuxt-link>
        </div>
      </div>
    </div>
    <div v-if="$route.query.type != 'graph'" class="list-result">
      <GroupPanelList :groups="search" />
    </div>
    <div v-show="$route.query.type == 'graph'" ref="graph" class="graph"></div>
  </div>
</template>

<script>
import MainHeader from '~/components/MainHeader';
import GroupPanelList from '@/components/GroupPanelList';
export default {
  components: {
    MainHeader,
    GroupPanelList,
  },
  props: {
    search: {
      type: Array,
      required: true,
    },
    groups: {
      type: Array,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      keyword: this.$route.query.keywords ?? '',
      graph: null,
      graphInfo: { depth: 0 },
      zoom: null,
    };
  },
  watch: {
    search(newValue) {
      if (this.$route.query.type === 'graph')
        this.$refs.graph.appendChild(this.chart());
    },
  },
  mounted() {
    if (this.$route.query.type === 'graph')
      this.$refs.graph.appendChild(this.chart());
  },
  methods: {
    searchGroups() {
      this.$router.push(
        // eslint-disable-next-line no-irregular-whitespace
        `/search?type=list&keywords=${this.keyword.split(/[ 　]/).join(' ')}`
      );
    },
    moveToList() {
      this.$refs.graph.removeChild(this.$refs.graph.firstChild);
      this.$router.push('/search?type=list');
    },
    chart() {
      const MOBILE_VIEWPORT_WIDTH = 400;
      const d3 = require('d3');
      const pack = (data, w, h) =>
        d3
          .pack()
          .size([w, h])
          .padding(50)(
          d3
            .hierarchy(data)
            .sum((d) => d.member + 1)
            .sort((a, b) => b.member - a.member)
        );
      const data = {
        id: -1,
        children: this.search,
      };

      const graph = this.$refs.graph;
      let root = pack(data, graph.offsetWidth, graph.offsetHeight);

      const color = d3
        .scaleLinear()
        .domain([0, root.height])
        .range(['hsl(20,100%,99.9%)', 'hsl(20,100%,50%)'])
        .interpolate(d3.interpolateHcl);

      const outColor = d3
        .scaleLinear()
        .domain([0, root.height])
        .range(['hsl(0,0%,98%)', 'hsl(0,0%,70%)'])
        .interpolate(d3.interpolateHcl);

      let focus = root;
      let view;

      const svg = d3
        .create('svg')
        .attr(
          'viewBox',
          `-${graph.offsetWidth / 2} -${graph.offsetHeight / 2} ${
            graph.offsetWidth
          } ${graph.offsetHeight}`
        )
        .style('background', color(0))
        .style('cursor', 'pointer')
        .style('margin', '0')
        .on('click', () => zoom(root));

      const node = svg
        .append('g')
        .attr('id', 'circle')
        .selectAll('circle')
        .data(root.descendants().slice(1), (d) => d.data.id)
        .join('circle')
        .attr('r', (d) => d.r)
        .attr('fill', (d) => (!d.children ? '#fd5600' : color(d.depth)))
        .attr('pointer-events', (d) => (!d.children ? 'none' : null))
        .on('mouseover', function() {
          d3.select(this).attr('stroke', '#333');
        })
        .on('mouseout', function() {
          d3.select(this).attr('stroke', null);
        })
        .on(
          'click',
          (d) => focus !== d && (zoom(d), d3.event.stopPropagation())
        );

      const label = svg
        .append('g')
        .style('font', '30px sans-serif')
        .attr('pointer-events', 'none')
        .attr('id', 'label')
        .selectAll('text')
        .data(root.descendants(), (d) => d.data.id)
        .join('text')
        .attr('text-anchor', 'middle')
        .attr('y', (d, i, nodes) => {
          if (!d.children || d.parent?.parent === focus) {
            return `${0}`;
          } else if (d.depth === focus.depth) {
            return -d.r;
          } else if (d.parent.depth === focus.depth) {
            return -((d.r / 100) * (70 + (d.depth - 1) * 15));
          } else {
            return 0;
          }
        })
        .style('fill-opacity', (d) => {
          if (d.parent?.data.id === root.data.id) {
            return 1;
          } else if (d.parent?.parent?.data.id === root.data.id) {
            return 0.4;
          } else {
            return 0;
          }
        })
        .style('display', (d) =>
          d.parent?.data.id === root.data.id ||
          d.parent?.parent?.data.id === root.data.id
            ? 'inline'
            : 'none'
        )
        .text((d) => d.data.name)
        .style('font-size', (d, i, texts) => {
          return SetFontSizeOffset(d, focus);
        })
        .attr('pointer-events', (d) => 'auto')
        .attr('dominant-baseline', 'middle')
        .attr('class', 'graph-text')
        .on('mouseover', function() {
          d3.select(this).text((d) => `Go to ${d.data.name}!!`);
        })
        .on('mouseout', function() {
          d3.select(this).text((d) => d.data.name);
        })
        .on('click', (d) => this.$router.push(`/groups/${d.data.id}`));

      d3.select(window).on('resize', () => {
        svg.attr(
          'viewBox',
          `-${graph.offsetWidth / 2} -${graph.offsetHeight / 2} ${
            graph.offsetWidth
          } ${graph.offsetHeight}`
        );

        root = pack(data, graph.offsetWidth, graph.offsetHeight);
        node
          .data(root.descendants().slice(1), (d) => d.data.id)
          .join((update) =>
            update
              .attr('transform', (d) => `translate(${d.x},${d.y})`)
              .attr('r', (d) => d.r)
              .attr('fill', (d) => (!d.children ? '#fd5600' : color(d.depth)))
              .attr('pointer-events', (d) => (!d.children ? 'none' : null))
              .on('mouseover', function() {
                d3.select(this).attr('stroke', '#000');
              })
              .on('mouseout', function() {
                d3.select(this).attr('stroke', null);
              })
              .on(
                'click',
                (d) => focus !== d && (zoom(d), d3.event.stopPropagation())
              )
          );

        label
          .data(root.descendants(), (d) => d.data.id)
          .join((update) =>
            update
              .attr('transform', (d) => `translate(${d.x},${d.y})`)
              .style('fill-opacity', (d) =>
                d.parent?.data.id === root.data.id ? 1 : 0
              )
              .style('display', (d) =>
                d.parent?.data.id === root.data.id ? 'inline' : 'none'
              )
              .attr('fill', '#4a4a4a')
          )
          .style('font-size', (d, i, texts) => {
            return SetFontSizeOffset(d, root);
          })
          .attr('y', (d, i, nodes) => {
            if (!d.children || d.parent?.parent === root) {
              return `${0}`;
            } else if (d.depth === root.depth) {
              return -d.r;
            } else if (d.parent.depth === root.depth) {
              return -((d.r / 100) * (70 + (d.depth - 1) * 15));
            } else {
              return 0;
            }
          });

        focus = root;
        zoomTo([root.x, root.y, root.r * 2]);
      });

      zoomTo([root.x, root.y, root.r * 2]);

      function zoomTo(v) {
        const w = graph.offsetWidth;
        const k = w / v[2];

        view = v;

        label.attr(
          'transform',
          (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`
        );
        node.attr(
          'transform',
          (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`
        );
        node.attr('r', (d) => d.r * k);
      }

      function zoom(d) {
        focus = d;

        const transition = svg
          .transition()
          .duration(d3.event.altKey ? 7500 : 750)
          .tween('zoom', (d) => {
            const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
            return (t) => zoomTo(i(t));
          });

        node.transition(transition).attr('fill', (d) => {
          if (focus.depth >= d.depth) {
            return outColor(d.depth);
          } else if (!d.children) {
            return '#fd5600';
          } else {
            return color(d.depth);
          }
        });

        label
          .filter(function(d) {
            return (
              d.parent === focus ||
              d.parent?.parent === focus ||
              this.style.display === 'inline'
            );
          })
          .transition(transition)
          .style('fill-opacity', (d) => {
            if (d.parent === focus) {
              return 1;
            } else if (d.parent.parent === focus) {
              return 0.6;
            } else {
              return 0;
            }
          })
          .style('font-size', (d, i, texts) => {
            return SetFontSizeOffset(d, focus);
          })
          .attr('y', (d, i, nodes) => {
            if (!d.children || d.parent?.parent === focus) {
              return `${0}`;
            } else if (d.depth === focus.depth) {
              return -d.r;
            } else if (d.parent.depth === focus.depth) {
              return -((d.r / 100) * (70 + (d.depth - 1) * 15));
            } else {
              return 0;
            }
          })
          .on('start', function(d) {
            if (d.parent === focus) this.style.display = 'inline';
            if (d.parent.parent === focus) {
              this.style.display = 'inline';
            }
          })
          .on('end', function(d) {
            if (d.parent === focus || d.parent.parent === focus) {
              this.style.display = 'inline';
            } else {
              this.style.display = 'none';
            }
          });
      }

      function calcFontSizeOffset(radius) {
        if (graph.offsetWidth <= MOBILE_VIEWPORT_WIDTH) {
          return Math.min(60, 100 - radius);
        }
        return Math.min(1.0, 1 - radius / 100);
        // return Math.min(1, (6 / 1000) * textLength * textLength);
      }

      function SetFontSizeOffset(d, focus) {
        console.log(d.data.name);
        console.log(d.r);
        if (graph.offsetWidth <= MOBILE_VIEWPORT_WIDTH) {
          if (d === focus) {
            return '160%';
          } else if (
            d.parent.parent?.depth === focus.depth ||
            d.parent.parent?.parent?.depth === focus.depth
          ) {
            return '40%';
          } else if (d.r <= 100) {
            return `${100 - calcFontSizeOffset(d.r)}%`;
          } else {
            return `${100}%`;
          }
        }

        if (d === focus) {
          return '2vw';
        } else if (
          d.parent.parent?.depth === focus.depth ||
          d.parent.parent?.parent?.depth === focus.depth
        ) {
          return '1.1vw';
        } else if (d.r <= 100) {
          return `${1.7 - calcFontSizeOffset(d.r)}vw`;
        } else {
          return `${1.7}vw`;
        }
      }

      return svg.node();
    },
  },
};
</script>

<style lang="scss" scoped>
.column {
  display: flex;
  flex-flow: column;
  padding: 0;
  .top {
    border-bottom: 1px solid lightgray;
    padding: 10px;
    .search-type {
      width: 60%;
      margin: 10px auto;
    }
    .field {
      width: 70%;
      margin: 0 auto;
    }
  }
  .list-result {
    flex: 1;
    overflow-y: scroll;
  }
  .graph {
    flex: 1;
    overflow: hidden;
  }
}
@media (max-width: 709px) {
  .graph-text {
    font-size: 16px;
  }
}
</style>
