'use client';

import { useState } from 'react';

interface Person {
  id: string;
  name: string;
  referral_code: string | null;
  referred_by: string | null;
  referred_by_type: 'customer' | 'provider' | null;
  type: 'customer' | 'provider';
  created_at: string;
}

interface TreeNode extends Person {
  children: TreeNode[];
  level: number;
}

interface Props {
  people: Person[];
}

export default function ReferralTree({ people }: Props) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<'all' | 'customer' | 'provider'>('all');
  const [search, setSearch] = useState('');

  // Build lookup map by referral code
  const byCode = new Map<string, Person>();
  people.forEach(p => {
    if (p.referral_code) {
      byCode.set(p.referral_code, p);
    }
  });

  // Find root nodes (people who joined organically - no referred_by)
  const rootPeople = people.filter(p => !p.referred_by);

  // Find children for a given referral code
  const getChildren = (referralCode: string | null): Person[] => {
    if (!referralCode) return [];
    return people.filter(p => p.referred_by === referralCode);
  };

  // Build tree recursively
  const buildTree = (person: Person, level: number = 0): TreeNode => {
    const children = getChildren(person.referral_code);
    return {
      ...person,
      level,
      children: children.map(child => buildTree(child, level + 1)),
    };
  };

  // Count total descendants
  const countDescendants = (node: TreeNode): number => {
    return node.children.reduce((sum, child) => sum + 1 + countDescendants(child), 0);
  };

  // Build all trees
  const trees = rootPeople.map(p => buildTree(p));

  // Sort trees by total descendants (most influential first)
  trees.sort((a, b) => countDescendants(b) - countDescendants(a));

  // Filter trees
  const filteredTrees = trees.filter(tree => {
    if (filter !== 'all' && tree.type !== filter) return false;
    if (search) {
      const searchLower = search.toLowerCase();
      const matchesSearch = (node: TreeNode): boolean => {
        if (node.name.toLowerCase().includes(searchLower)) return true;
        if (node.referral_code?.toLowerCase().includes(searchLower)) return true;
        return node.children.some(matchesSearch);
      };
      return matchesSearch(tree);
    }
    return true;
  });

  // Toggle node expansion
  const toggleNode = (id: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Expand all
  const expandAll = () => {
    const allIds = new Set<string>();
    const addAllIds = (node: TreeNode) => {
      allIds.add(node.id);
      node.children.forEach(addAllIds);
    };
    filteredTrees.forEach(addAllIds);
    setExpandedNodes(allIds);
  };

  // Collapse all
  const collapseAll = () => {
    setExpandedNodes(new Set());
  };

  // Render tree node
  const renderNode = (node: TreeNode, isLast: boolean = false, prefix: string = '') => {
    const hasChildren = node.children.length > 0;
    const isExpanded = expandedNodes.has(node.id);
    const descendants = countDescendants(node);

    return (
      <div key={node.id} className="select-none">
        <div 
          className={`flex items-center gap-2 py-1.5 px-2 rounded hover:bg-gray-50 cursor-pointer ${node.level === 0 ? 'bg-yellow-50 border border-yellow-200' : ''}`}
          onClick={() => hasChildren && toggleNode(node.id)}
        >
          {/* Tree line prefix */}
          <span className="text-gray-300 font-mono text-xs whitespace-pre">{prefix}</span>
          
          {/* Expand/collapse indicator */}
          {hasChildren ? (
            <span className="w-4 h-4 flex items-center justify-center text-gray-400 text-xs">
              {isExpanded ? '▼' : '▶'}
            </span>
          ) : (
            <span className="w-4 h-4"></span>
          )}

          {/* Type badge */}
          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${node.type === 'customer' ? 'bg-green-500' : 'bg-blue-500'}`}></span>

          {/* Name */}
          <span className="font-medium text-sm">{node.name}</span>

          {/* Referral code */}
          {node.referral_code && (
            <span className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">
              {node.referral_code}
            </span>
          )}

          {/* Type label */}
          <span className={`text-xs px-1.5 py-0.5 rounded ${node.type === 'customer' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
            {node.type === 'customer' ? 'C' : 'P'}
          </span>

          {/* Descendants count */}
          {descendants > 0 && (
            <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded font-medium">
              {descendants} referral{descendants > 1 ? 's' : ''}
            </span>
          )}

          {/* Date */}
          <span className="text-xs text-gray-400 ml-auto">
            {new Date(node.created_at).toLocaleDateString()}
          </span>
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div className="ml-4">
            {node.children.map((child, idx) => 
              renderNode(
                child, 
                idx === node.children.length - 1,
                prefix + (isLast ? '   ' : '│  ')
              )
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Toolbar */}
      <div className="p-4 border-b flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search by name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          >
            <option value="all">All Types</option>
            <option value="customer">Customers Only</option>
            <option value="provider">Providers Only</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button
            onClick={expandAll}
            className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Tree View */}
      <div className="p-4 max-h-[600px] overflow-y-auto">
        {filteredTrees.length > 0 ? (
          <div className="space-y-2">
            {filteredTrees.map((tree, idx) => renderNode(tree, idx === filteredTrees.length - 1))}
          </div>
        ) : (
          <p className="text-center text-gray-400 py-8">
            {search ? 'No matching results' : 'No referral data yet'}
          </p>
        )}
      </div>

      {/* Summary */}
      <div className="p-4 border-t text-sm text-gray-500">
        Showing {filteredTrees.length} root node{filteredTrees.length !== 1 ? 's' : ''} (organic signups)
        {filter !== 'all' && ` • Filtered by ${filter}s`}
      </div>
    </div>
  );
}
