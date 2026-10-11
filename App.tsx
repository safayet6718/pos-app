import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Topbar } from './components/layout/Topbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';

// Modules
import { DashboardModule } from './components/modules/DashboardModule';
import { POSModule } from './components/modules/POSModule';
import { SalesModule } from './components/modules/SalesModule';
import { ContactsModule } from './components/modules/ContactsModule';
import { AdvanceModule } from './components/modules/AdvanceModule';
import { CouponsModule } from './components/modules/CouponsModule';
import { QuotationModule } from './components/modules/QuotationModule';
import { PurchaseModule } from './components/modules/PurchaseModule';
import { AccountsModule } from './components/modules/AccountsModule';
import { ItemsModule } from './components/modules/ItemsModule';
import { StockModule } from './components/modules/StockModule';
import { ExpensesModule } from './components/modules/ExpensesModule';
import { PlacesModule } from './components/modules/PlacesModule';
import { MessagingModule } from './components/modules/MessagingModule';
import { ReportsModule } from './components/modules/ReportsModule';
import { WarehouseModule } from './components/modules/WarehouseModule';
import { SettingsModule } from './components/modules/SettingsModule';
import { HelpModule } from './components/modules/HelpModule';
import { UsersModule } from './components/modules/UsersModule';
import { LoginScreen } from './components/auth/LoginScreen';
import { AccessDenied } from './components/common/AccessDenied';

const MainLayout: React.FC = () => {
  const { activeModule, toastMessage, isAuthenticated, canAccess } = useApp();

  // If not logged in, render authentication page
  if (!isAuthenticated) {
    return (
      <>
        <LoginScreen />
        {toastMessage && (
          <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xl border border-slate-700 animate-in slide-in-from-bottom-2 fade-in duration-200 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{toastMessage}</span>
          </div>
        )}
      </>
    );
  }

  // If in POS screen mode, render full-screen POS without sidebar/topbar
  if (activeModule === 'pos') {
    if (!canAccess('pos')) {
      return (
        <div className="min-h-screen flex flex-col bg-[#eaeef6] text-slate-800 antialiased">
          <Topbar />
          <AccessDenied moduleName="POS Terminal" requiredRole="Cashier / Sales Admin / Super Admin" />
          <Footer />
        </div>
      );
    }
    return <POSModule />;
  }

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardModule />;
      case 'users':
        return <UsersModule subModule="users" />;
      case 'roles':
        return <UsersModule subModule="roles" />;
      case 'sales-list':
        return <SalesModule subModule="list" />;
      case 'sales-add':
        return <SalesModule subModule="add" />;
      case 'sales-payments':
        return <SalesModule subModule="payments" />;
      case 'sales-returns':
        return <SalesModule subModule="returns" />;
      case 'customers':
        return <ContactsModule subModule="customers" />;
      case 'customer-add':
        return <ContactsModule subModule="customer-add" />;
      case 'suppliers':
        return <ContactsModule subModule="suppliers" />;
      case 'supplier-add':
        return <ContactsModule subModule="supplier-add" />;
      case 'import-customers':
        return <ContactsModule subModule="import-customers" />;
      case 'import-suppliers':
        return <ContactsModule subModule="import-suppliers" />;
      case 'advance-list':
        return <AdvanceModule subModule="list" />;
      case 'advance-add':
        return <AdvanceModule subModule="add" />;
      case 'coupons-master':
        return <CouponsModule subModule="master" />;
      case 'customer-coupons':
        return <CouponsModule subModule="customer" />;
      case 'quotation-list':
        return <QuotationModule subModule="list" />;
      case 'quotation-new':
        return <QuotationModule subModule="new" />;
      case 'purchase-list':
        return <PurchaseModule subModule="list" />;
      case 'purchase-new':
        return <PurchaseModule subModule="new" />;
      case 'purchase-returns':
        return <PurchaseModule subModule="returns" />;
      case 'accounts-list':
        return <AccountsModule subModule="list" />;
      case 'accounts-add':
        return <AccountsModule subModule="add" />;
      case 'money-transfer':
        return <AccountsModule subModule="transfer" />;
      case 'deposits':
        return <AccountsModule subModule="deposits" />;
      case 'cash-transactions':
        return <AccountsModule subModule="cash-transactions" />;
      case 'items-list':
        return <ItemsModule subModule="list" />;
      case 'item-add':
        return <ItemsModule subModule="item-add" />;
      case 'service-add':
        return <ItemsModule subModule="service-add" />;
      case 'categories':
        return <ItemsModule subModule="categories" />;
      case 'brands':
        return <ItemsModule subModule="brands" />;
      case 'variants':
        return <ItemsModule subModule="variants" />;
      case 'units':
        return <ItemsModule subModule="units" />;
      case 'print-labels':
        return <ItemsModule subModule="print-labels" />;
      case 'import-items':
        return <ItemsModule subModule="import-items" />;
      case 'import-services':
        return <ItemsModule subModule="import-services" />;
      case 'stock-adjustment':
        return <StockModule subModule="adjustment" />;
      case 'stock-transfer':
        return <StockModule subModule="transfer" />;
      case 'expenses-list':
        return <ExpensesModule subModule="list" />;
      case 'expense-categories':
        return <ExpensesModule subModule="categories" />;
      case 'countries':
        return <PlacesModule subModule="countries" />;
      case 'states':
        return <PlacesModule subModule="states" />;
      case 'messaging-send':
        return <MessagingModule subModule="send" />;
      case 'messaging-templates':
        return <MessagingModule subModule="templates" />;
      case 'reports':
        return <ReportsModule />;
      case 'warehouses':
        return <WarehouseModule subModule="list" />;
      case 'warehouse-add':
        return <WarehouseModule subModule="add" />;
      case 'settings':
        return <SettingsModule />;
      case 'help':
        return <HelpModule />;
      default:
        return <DashboardModule />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#eaeef6] text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      {/* Dark Navy Topbar */}
      <Topbar />

      {/* Main Workspace: Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Dark Teal Sidebar */}
        <Sidebar />

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#eaeef6]">
          <div className="max-w-7xl mx-auto space-y-4">
            {!canAccess(activeModule) ? (
              <AccessDenied moduleName={activeModule} />
            ) : (
              renderActiveModule()
            )}
          </div>
        </main>
      </div>

      {/* Global Footer */}
      <Footer />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xl border border-slate-700 animate-in slide-in-from-bottom-2 fade-in duration-200 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
